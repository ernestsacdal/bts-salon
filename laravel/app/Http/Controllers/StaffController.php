<?php

namespace App\Http\Controllers;
use App\Models\Salon;
use Illuminate\Support\Facades\Storage;
use App\Models\Staff;

use Illuminate\Http\Request;

class StaffController extends Controller
{
    //////////////////////////////////////////////////////////////////////

    public function store(Request $request)
    {
        $data = $request->validate([
            'salon_id' => 'required|integer',
            'specialist' => 'required|string',
            'availability' => 'required|boolean',
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = $request->file('avatar')->store('avatars', 'public');
        $extension = $request->file('avatar')->getClientOriginalExtension();
        $imageName = pathinfo($imagePath, PATHINFO_FILENAME);
        $data['avatar'] = $imageName . '.' . $extension;

        $staffMember = Staff::create($data);

        return response()->json(['message' => 'Staff member created', 'data' => $staffMember]);
    }

    //////////////////////////////////////////////////////////////////////

    public function display()
    {
        $salon = auth()->user();
        $staff = Staff::where('salon_id', $salon->id)->get();
        return response()->json(['data' => $staff]);
    }

    //////////////////////////////////////////////////////////////////////

    public function deleteById($id)
    {
        $staffMember = Staff::find($id);
        if (!$staffMember) {
            return response()->json(['message' => 'Staff member not found'], 404);
        }
        if (Storage::disk('public')->exists('avatars/' . $staffMember->avatar)) {
            Storage::disk('public')->delete('avatars/' . $staffMember->avatar);
        }
        $staffMember->delete();
        return response()->json(['message' => 'Staff member deleted'], 200);
    }

    //////////////////////////////////////////////////////////////////////

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'salon_id' => 'required|integer',
            'specialist' => 'required|string',
            'availability' => 'required|boolean',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $staffMember = Staff::findOrFail($id);
        $staffMember->salon_id = $data['salon_id'];
        $staffMember->specialist = $data['specialist'];
        $staffMember->availability = $data['availability'];

        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $avatarPath = $avatar->store('avatars', 'public');
            $avatarName = pathinfo($avatarPath, PATHINFO_FILENAME);
            $avatarExtension = $avatar->getClientOriginalExtension();
            $avatarNameWithExtension = $avatarName . '.' . $avatarExtension;
            $staffMember->avatar = $avatarNameWithExtension;
        }

        $staffMember->save();

        return response()->json(['message' => 'Staff member updated', 'data' => $staffMember]);
    }

    //////////////////////////////////////////////////////////////////////
}

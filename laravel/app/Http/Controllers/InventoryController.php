<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Inventory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;


class InventoryController extends Controller
{


    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        $salon = auth()->user();
        $data['salon_id'] = $salon->id;
        $imagePath = $request->file('image')->store('products', 'public');
        $extension = $request->file('image')->getClientOriginalExtension();
        $imageName = pathinfo($imagePath, PATHINFO_FILENAME);
        $data['image'] = $imageName . '.' . $extension;
        $inventoryItem = Inventory::create($data);
        $inventoryItem->available = ($data['quantity'] >= 1) ? 1 : 0;
        $inventoryItem->save();
        return response()->json(['message' => 'Inventory item created', 'data' => $inventoryItem]);
    }


    public function display()
    {
        $salon = auth()->user();
        $inventory = Inventory::where('salon_id', $salon->id)->get();
        return response()->json(['data' => $inventory]);
    }


    public function deleteById($id)
    {
        $inventory = Inventory::find($id);
        if (!$inventory) {
            return response()->json(['message' => 'Inventory not found'], 404);
        }
        if (Storage::disk('public')->exists('products/' . $inventory->image)) {
            Storage::disk('public')->delete('products/' . $inventory->image);
        }
        $inventory->delete();
        return response()->json(['message' => 'Inventory deleted'], 200);
    }


    public function update(Request $request, $id)
    {
        Log::info($request->all()); // Log all request data
        logger($request->all());
        logger($request->all());

        $data = $request->validate([
            'name' => 'required|string',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'image' => 'nullable'
        ]);

        $inventoryItem = Inventory::findOrFail($id);
        $inventoryItem->name = $data['name'];
        $inventoryItem->quantity = $data['quantity'];
        $inventoryItem->price = $data['price'];


        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imagePath = $image->store('products', 'public');
            $imageName = pathinfo($imagePath, PATHINFO_FILENAME);
            $extension = $image->getClientOriginalExtension();
            $imageNameWithExtension = $imageName . '.' . $extension;
            $inventoryItem->image = $imageNameWithExtension;
        }

        $inventoryItem->available = ($data['quantity'] >= 1) ? 1 : 0;
        $inventoryItem->save();

        return response()->json(['message' => 'Inventory item updated', 'data' => $inventoryItem]);
    }
}

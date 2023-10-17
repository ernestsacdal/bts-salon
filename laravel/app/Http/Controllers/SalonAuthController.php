<?php

namespace App\Http\Controllers;

use App\Models\Salon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
class SalonAuthController extends Controller
{
    //////////////////////////////////////////////////////////////////////

    public function register(Request $request)
    {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|unique:salon,email',
        'password' => 'required|string|confirmed',
    ]);

    // Create and save the salon user
    $salon = new Salon([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password), // Hash the password
    ]);

    $salon->save();

    return response()->json(['message' => 'Salon registered successfully'], 201);
    }

    /////////////////////////////////////////////////////////////////////////////////////////


    public function logout(Request $request)
    {
        $request->user('salon')->tokens()->delete();

        return response()->json(['message' => 'Salon logged out successfully']);
    }

 /////////////////////////////////////////////////////////////////////////////////////////
    
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
    
        if (Auth::guard('salon-api')->attempt($request->only('email', 'password'))) {
            $salon = Salon::where('email', $request->email)->first();
    
            $token = $salon->createToken('salon-token')->plainTextToken;
    
            return response()->json(['access_token' => $token], 200);
        }
    
        return response()->json(['message' => 'Unauthorized'], 401);
    }
}

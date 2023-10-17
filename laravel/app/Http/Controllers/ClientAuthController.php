<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\Auth;
class ClientAuthController extends Controller
{
    ///////////////////////////////////////////////////////////////////////
    public function registerC(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:clients,email',
            'password' => 'required|string|confirmed',
        ]);

        $client = new Client([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hash the password
        ]);

        $client->save();

        // Return a success response without a token
        return response()->json(['message' => 'Client registered successfully'], 201);
    }


///////////////////////////////////////////////////////////////////////

    public function logoutC(Request $request)
    {
        $request->user('client')->tokens()->delete();

        return response()->json(['message' => 'Client logged out successfully']);
    }

    ///////////////////////////////////////////////////////////////////////

    public function loginC(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
    
        if (Auth::guard('client-api')->attempt($request->only('email', 'password'))) {
            $client = Client::where('email', $request->email)->first();
    
            $token = $client->createToken('client-token')->plainTextToken;
    
            return response()->json(['access_token' => $token], 200);
        }
    
        // Return an error response if authentication fails
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    ///////////////////////////////////////////////////////////////////////
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // POST /api/login
    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        // Ελέγχουμε αν υπάρχει ο χρήστης και αν ο κωδικός ταιριάζει με το hash
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Λάθος στοιχεία σύνδεσης.'
            ], 401); // 401 Unauthorized
        }

        // Δημιουργούμε ένα μοναδικό Sanctum Token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Επιτυχής σύνδεση!',
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'user'         => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role,
            ]
        ]);
    }

    // POST /api/logout
    public function logout(Request $request)
    {
        // Ακυρώνουμε το token του τρέχοντος request
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Αποσυνδεθήκατε επιτυχώς.'
        ]);
    }
}

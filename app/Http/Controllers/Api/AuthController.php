<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;
// use App\Mail\NotifyEmail;
use App\Models\User;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $data = $request->all();
        $validator = Validator::make($data, [
            'username' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        
        $user = User::where("username", $request->username)->first();
        if (!is_null($user)) {
            $role = $user->role;
            // grant scopes based on the role that we get previously

            $request->request->add([
                "scope" => [$role]
            ]);
        }
    
        // forward the request to the oauth token request endpoint
        $tokenRequest = Request::create(
            '/oauth/token',
            'post'
        );

        return Route::dispatch($tokenRequest);
    }

    public function refreshToken(Request $request)
    {
        $tokenRequest = Request::create(
            '/oauth/token',
            'post'
        );
        return Route::dispatch($tokenRequest);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        return response()->json(['user' => $user], 200);
    }

    public function logout (Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();
        $response = ['message' => 'You have been successfully logged out!'];
        return response($response, 200);
    }
}
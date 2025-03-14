<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Laravel\Passport\Exceptions\MissingScopeException;
use Illuminate\Http\Request;
use Illuminate\Auth\Access\AuthorizationException;
use \Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Illuminate\Http\Exceptions\ThrottleRequestsException;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {

        
        $this->renderable(function (AccessDeniedHttpException $e, Request $request) {
            
            return response()->json([
                'message' => 'Access Denied.'
            ], 403);
        });

        $this->renderable(function (ThrottleRequestsException $e, Request $request) {
            return response()->json([
                'message' => 'Too Many Requests.'
            ], 419);
        });

        

        // $this->reportable(function (Throwable $e) {
        //     //
        // });
    }
}

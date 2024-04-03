<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response([
            "users"=>User::all()
        ]) ;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            'user'=>User::find($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user=User::find($id);
        return response()->json([
            'pet'=>$user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user=User::find($id);

        $request->validate([
            'nom'=>'string|required',
            'email'=>'string|required',
            'adresse'=>'string|required',
            'telephone'=>'string|required',
        ]);

        $user->update([
            'nom'=>$request->nom,
            'email'=>$request->email,
            'adresse'=>$request->adresse,
            'telephone'=>$request->telephone,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        User::find($id)->delete();
        return response()->json([
            'message'=>'User Deleted Successfully!!'
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response([
            "team"=>Team::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom'=>'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|',
            'description'=>'required',
            'title'=>'required',
        ]);

        // Handle file upload
        $filepath='';
        if ($request->hasFile('image')) {
            $filepath = $request->file('image')->store('team','public');
        }
        
        Team::create([
            'nom'=>$request->nom,
            'image'=>$filepath, 
            'description'=>$request->description,
            'title'=>$request->title,          
        ]);

        return response()->json([
            'message'=>'Member Added Successfully!!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            'team'=>Team::find($id)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Team::find($id)->delete();
        return response()->json([
            'message'=>'Member Deleted Successfully!!'
        ]);
    }
}
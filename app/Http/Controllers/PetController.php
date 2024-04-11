<?php

namespace App\Http\Controllers;

use App\Models\pet;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response([
            "pets"=>pet::all()
        ]);
    }

    public function filterAnimals()
    {
        $pets = pet::where('visibility', true)->get();
        return response()->json(['pets' => $pets]);
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
        $request->validate([
            'nom'=>'required',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|', // Adjust the maximum file size as needed
            'description'=>'required',
            'sexe'=>'required',
            'espece'=>'required',
            'age'=>'required',
            'sante'=>'required',
        ]);

        // Handle file upload
        $filepath='';
        if ($request->hasFile('photo')) {
            $filepath = $request->file('photo')->store('pets','public');
        }
        
        pet::create([
            'nom'=>$request->nom,
            'photo'=>$filepath, // Assign the full file path
            'description'=>$request->description,
            'sexe'=>$request->sexe,
            'espece'=>$request->espece,
            'age'=>$request->age,
            'sante'=>$request->sante,            
        ]);

        return response()->json([
            'message'=>'Pet Added Successfully!!'
        ]);
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json([
            'pet'=>pet::find($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $pet=pet::find($id);
        return response()->json([
            'pet'=>$pet
        ]);
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, $id)
    {
        $pet = pet::find($id);

        $request->validate([
            'nom'=>'string|required',
            'photo'=>'nullable',
            'description'=>'string|required',
            'sexe'=>'string|required',
            'espece'=>'string|required',
            'age'=>'numeric',
            'sante'=>'string|required',
        ]);

        // $photo = $pet->photo;
        // if($request->hasFile('photo')){
        //     $photo=$request->file('photo')->store('pets','public');
        //     $pet->photo = $photo;
        //     $pet->save();
        // }

        if ($request->hasFile('photo')) {
            $photo = $request->file('photo')->store('pets', 'public');
            Storage::disk('public')->delete($pet->photo);
            $pet->photo = $photo;
        }

        $pet->update([
            'nom'=>$request->nom,
            // 'photo'=>$photo,
            'description'=>$request->description,
            'sexe'=>$request->sexe,
            'espece'=>$request->espece,
            'age'=>$request->age,
            'sante'=>$request->sante,
        ]);
        return response([
            'Success' => 'You have updated the pet successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        pet::find($id)->delete();
        return response()->json([
            'message'=>'Product Deleted Successfully!!'
        ]);
    }
}
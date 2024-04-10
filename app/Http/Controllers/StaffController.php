<?php

namespace App\Http\Controllers;

use App\Models\Staff;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response([
            "staff" => Staff::all()
        ]);
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
            'staff' => Staff::find($id)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $staff = Staff::find($id);
        return response()->json([
            'staff' => $staff
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $staff = Staff::find($id);

        $request->validate([
            'nom' => 'string|required',
            'role' => 'string|required',
            'email' => 'string|required',
        ]);

        $staff->update([
            'nom' => $request->nom,
            'role' => $request->role,
            'email' => $request->email,
        ]);

        return response()->json([
            'message' => 'Staff Updated Successfully!!'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Staff::find($id)->delete();
        return response()->json([
            'message' => 'Staff Deleted Successfully!!'
        ]);
    }
}

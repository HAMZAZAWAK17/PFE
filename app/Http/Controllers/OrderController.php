<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\pet;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function __construct()
    {
        $this->middleware('verifyAuth');
    }

    public function index()
    {
        $orders = Order::with(['user', 'pet'])->get();
        return response()->json(['orders' => $orders]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'pet_id' => 'required|exists:pets,id',
            'status',
            'raison'
        ]);

        // Create a new order
        $order = new Order();
        $order->user_id = $request->input('user_id');
        $order->pet_id = $request->input('pet_id');

        $order->save();

        $user = User::select('name', 'email', 'telephone', 'adresse')->find($order->user_id);
        $pet = pet::select('nom', 'sexe', 'age', 'photo', 'description', 'espece', 'sante')->find($order->pet_id);

        $data = [
            'order_id' => $order->id,
            'order' => $order->status,
            'user' => $user,
            'raison' => $order->raison,
            'pet' => $pet,
        ];

        return response()->json(['success' => true, 'data' => $data]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Retrieve the order with the given ID along with its associated user and pet
        $order = Order::with(['user:id,name,email,telephone', 'pet:id,nom,age,sexe'])->find($id);

        // If the order doesn't exist, return a 404 response
        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        // Return the order details as JSON response
        return response()->json(['order' => $order]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Order deleted successfully']);
    }

    public function acceptOrder($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $order->update(['status' => 'Accepté']);
        $order->pet->update(['visibility' => false]);

        return response()->json(['message' => 'Order accepted successfully']);
    }

    public function refuseOrder(Request $request, $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $request->validate([
            'raison' => 'required|string',
        ]);

        $order->update([
            'status' => 'Refusé',
            'raison' => $request->input('raison'),
        ]);

        $order->pet->update(['visibility' => true]);

        return response()->json(['message' => 'Order refused successfully']);
    }

    public function reset($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $order->pet->update(['visibility' => true]);
        $order->update([
            'status' => 'pending',
            'raison' => 'Non spécifié',
        ]);

        return response()->json(['message' => 'Order reseted successfully']);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\pet;
use App\Models\Reservation;
use App\Models\Team;
use App\Models\User;

class DashboardController extends Controller
{
    public function __construct()
    {
        $this->middleware('verifyAuth');
    }

    public function getPetCount()
    {
        $petCount = pet::count();

        return response()->json(['pet_count' => $petCount]);
    }

    public function getUserCount()
    {
        $userCount = User::count();

        return response()->json(['user_count' => $userCount]);
    }

    public function getTeamCount()
    {
        $teamMemberCount = Team::count();

        return response()->json(['team_member_count' => $teamMemberCount]);
    }

    public function getReservationTotalPrice()
    {
        $reservationTotalPrice = Reservation::sum('prix');
        return response()->json(['reservation_total_price' => $reservationTotalPrice]);
    }

    public function getAvgDuration()
    {
        $avgDuration = Reservation::avg('duree');
        return response()->json(['duree_moyenne' => $avgDuration]);
    }

    public function getOrderTotal()
    {
        $orderTotal = Order::count();

        return response()->json(['order_total' => $orderTotal]);
    }

    // ---------- CHARTS -----------
    public function getOrderData()
    {
        $orders = Order::with('user')->get();

        $orderData = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'status' => $order->status,
                'user_name' => $order->user->name,
                'order_date' => $order->created_at->format('d-m-Y')
            ];
        });

        return response()->json($orderData);
    }

    public function getUserData()
    {
        $users = User::all();

        $userData = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'user_date' => $user->created_at->format('d-m-Y')
            ];
        });

        return response()->json($userData);
    }

    public function getReservationData()
    {
        $reservations = Order::with('user')->get();

        $reservationData = $reservations->map(function ($reservation) {
            return [
                'id' => $reservation->id,
                'status' => $reservation->status,
                'user_name' => $reservation->user->name,
                'reservation_date' => $reservation->created_at->format('d-m-Y')
            ];
        });

        return response()->json($reservationData);
    }

    public function getSanteStatus()
    {
        $bien = pet::where('sante','bien')->count();
        $mal = pet::where('sante','mal')->count();
        $normal = pet::where('sante','normal')->count();

        return response()->json([
            'bien'=>$bien,
            'mal'=>$mal,
            'normal'=>$normal,
        ]);
    }

    public function getOrderStatus()
    {
        $pending = Order::where('status','pending')->count();
        $accepte = Order::where('status','Accepté')->count();
        $refuse = Order::where('status','Refusé')->count();

        return response()->json([
            'pending'=>$pending,
            'accepte'=>$accepte,
            'refuse'=>$refuse,
        ]);
    }
}
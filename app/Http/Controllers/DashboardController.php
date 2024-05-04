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
}
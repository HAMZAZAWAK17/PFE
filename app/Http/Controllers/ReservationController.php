<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\User;
use Illuminate\Http\Request;
use Carbon\Carbon;


class ReservationController extends Controller
{
    public function __construct()
    {
        $this->middleware('verifyAuth');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservations = Reservation::with('user')->get();
        return response()->json(['reservations' => $reservations]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'nom' => 'required',
            'espece' => 'required',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
            'raison'
        ]);

        $reservation = new Reservation();
        $reservation->user_id = $request->input('user_id');
        $reservation->nom = $request->input('nom');
        $reservation->espece = $request->input('espece');
        $reservation->date_debut = $request->input('date_debut');
        $reservation->date_fin = $request->input('date_fin');

        $start = Carbon::parse($reservation->date_debut);
        $end = Carbon::parse($reservation->date_fin);
        $duree = $end->diffInDays($start);

        //7sseb l prix hna
        $reservation->prix = 20 * $duree;

        $reservation->duree = $duree;

        $reservation->save();

        $user = User::select('name', 'email', 'telephone', 'adresse')->find($reservation->user_id);

        $data = [
            'reservation_id' => $reservation->id,
            'nom' => $reservation->nom,
            'espece' => $reservation->espece,
            'date_debut' => $reservation->date_debut,
            'date_fin' => $reservation->date_fin,
            'duree' => $duree,
            'prix' => $reservation->prix,
            'raison'
        ];

        return response()->json(['success' => true, 'data' => $data]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reservation = Reservation::with(['user'])->find($id);

        if (!$reservation) {
            return response()->json(['error' => 'Reservation not found'], 404);
        }

        return response()->json(['reservation' => $reservation]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['error' => 'Reservation not found'], 404);
        }

        $reservation->delete();

        return response()->json(['message' => 'Reservation deleted successfully']);
    }

    public function AcceptReservation($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['error' => 'Reservation not found'], 404);
        }

        $reservation->update(['status' => 'Accepté']);

        return response()->json(['message' => 'Reservation accepted successfully']);
    }

    public function refuseReservation(Request $request, $id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['error' => 'Reservation not found'], 404);
        }

        $request->validate([
            'raison' => 'required|string',
        ]);

        $reservation->update([
            'status' => 'Refusé',
            'raison' => $request->input('raison'),
        ]);

        return response()->json(['message' => 'Reservation refused successfully']);
    }

    public function reset($id)
    {
        $reservation = Reservation::find($id);

        if (!$reservation) {
            return response()->json(['error' => 'Reservation not found'], 404);
        }

        $reservation->update([
            'status' => 'pending',
            'raison' => 'Non spécifié',
        ]);

        return response()->json(['message' => 'Order reseted successfully']);
    }
}
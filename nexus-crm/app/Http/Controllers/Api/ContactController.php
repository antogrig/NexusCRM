<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Αποθήκευση νέου μηνύματος επικοινωνίας από το Portfolio (Δημόσιο Endpoint)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|min:10',
        ]);

        // Καταγραφή IP διεύθυνσης αποστολέα
        $validated['ip_address'] = $request->ip();

        $message = ContactMessage::create($validated);

        return response()->json([
            'status'  => 'success',
            'message' => 'Το μήνυμά σας παραλήφθηκε με επιτυχία!',
            'data'    => $message,
        ], 201);
    }

    /**
     * Προβολή όλων των ληφθέντων μηνυμάτων για το CRM (Προστατευμένο με Sanctum)
     */
    public function index()
    {
        $messages = ContactMessage::latest()->get();

        return response()->json([
            'status' => 'success',
            'data'   => $messages,
        ]);
    }
}

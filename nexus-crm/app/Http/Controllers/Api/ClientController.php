<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    // 1. GET (Διάβασμα όλων μαζί με τα Projects τους)
    public function index()
    {
        $clients = Client::with('projects.tasks')->latest()->get();

        return response()->json($clients);
    }

    // 2. POST (Δημιουργία νέου)
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'company_name' => 'required|string|max:255',
            'vat_number'   => 'nullable|string|unique:clients,vat_number',
            'email'        => 'nullable|email',
            'phone'        => 'nullable|string'
        ]);

        $client = Client::create($validatedData);
        return response()->json($client, 201);
    }

    // 3. GET (Διάβασμα ενός)
    public function show(Client $client)
    {
        return response()->json($client);
    }

    // 4. PUT / PATCH (Ενημέρωση/Edit)
    public function update(Request $request, Client $client)
    {
        $validatedData = $request->validate([
            'company_name' => 'sometimes|required|string|max:255',
            'vat_number'   => 'nullable|string|unique:clients,vat_number,' . $client->id,
            'email'        => 'nullable|email',
            'phone'        => 'nullable|string'
        ]);

        $client->update($validatedData);
        return response()->json($client);
    }

    // 5. DELETE (Διαγραφή)
    public function destroy(Client $client)
    {
        $client->delete();
        return response()->json(['message' => 'Ο πελάτης διαγράφηκε επιτυχώς.']);
    }
}

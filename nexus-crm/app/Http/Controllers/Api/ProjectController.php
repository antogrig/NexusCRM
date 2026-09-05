<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // POST /api/projects (Δημιουργία νέου Project για έναν πελάτη)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id', // Βεβαιωνόμαστε ότι ο πελάτης υπάρχει στη βάση!
            'title'     => 'required|string|max:255',
            'status'    => 'sometimes|in:open,in_progress,completed',
        ]);

        $project = Project::create($validated);

        return response()->json($project, 201);
    }

    // DELETE /api/projects/{project} (Διαγραφή Project)
    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(['message' => 'Το project διαγράφηκε επιτυχώς.']);
    }
}

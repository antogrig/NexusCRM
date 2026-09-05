<?php

namespace App\Http\Controllers\Api;

use App\Jobs\SendTaskCreatedNotification;
use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    // POST /api/tasks (Δημιουργία νέου Task σε ένα Project)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id'  => 'required|exists:projects,id',
            'title'       => 'required|string|max:255',
            'status'      => 'sometimes|in:todo,in_progress,review,done',
        ]);

        // Συνδέουμε αυτόματα το task με τον συνδεδεμένο χρήστη (User ID)
        $validated['user_id'] = $request->user()->id;

        $task = Task::create($validated);

        // Στέλνουμε το Job στην ουρά (Queue)!
        SendTaskCreatedNotification::dispatch($task);

        return response()->json($task, 201);
    }

    // PATCH /api/tasks/{task} (Αλλαγή status ή title)
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title'  => 'sometimes|string|max:255',
            'status' => 'sometimes|in:todo,in_progress,review,done',
        ]);

        $task->update($validated);

        return response()->json($task);
    }

    // DELETE /api/tasks/{task}
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->json(['message' => 'Το task διαγράφηκε.']);
    }
}

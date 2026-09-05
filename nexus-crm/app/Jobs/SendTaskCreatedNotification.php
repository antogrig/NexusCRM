<?php

namespace App\Jobs;

use App\Models\Task;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

// Το "implements ShouldQueue" λέει στο Laravel: "ΜΗΝ το εκτελέσεις τώρα, βάλ' το στην ουρά!"
class SendTaskCreatedNotification implements ShouldQueue
{
    use Queueable;

    public Task $task;

    /**
     * Λαμβάνουμε το task που μόλις δημιουργήθηκε
     */
    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    /**
     * Εδώ γράφουμε τη χρονοβόρα εργασία (εκτελείται στο παρασκήνιο)
     */
    public function handle(): void
    {
        // Προσομοίωση καθυστέρησης (π.χ. αναμονή 2 δευτερολέπτων για σύνδεση με εξωτερικό Mail Server)
        sleep(2);

        // Γράφουμε στο log αρχείο του Laravel ότι το email/notification στάλθηκε επιτυχώς!
        Log::info("📨 [ASYNC QUEUE] Εστάλη ειδοποίηση για το νέο Task: '{$this->task->title}' (ID: {$this->task->id}) στο Project ID: {$this->task->project_id}");
    }
}

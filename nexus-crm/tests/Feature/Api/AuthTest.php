<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    // Το RefreshDatabase καθαρίζει τη δοκιμαστική βάση πριν από κάθε test
    use RefreshDatabase;

    /**
     * Test 1: Έλεγχος ότι ο χρήστης συνδέεται επιτυχώς με σωστά στοιχεία
     */
    public function test_user_can_login_with_valid_credentials(): void
    {
        // 1. Δημιουργούμε έναν δοκιμαστικό χρήστη
        $user = User::create([
            'name'     => 'John Doe',
            'email'    => 'john@example.com',
            'password' => 'secret123',
            'role'     => 'admin',
        ]);

        // 2. Στέλνουμε POST request στο API
        $response = $this->postJson('/api/login', [
            'email'    => 'john@example.com',
            'password' => 'secret123',
        ]);

        // 3. Επαληθεύουμε ότι πήραμε 200 OK και ότι επιστράφηκε Token
        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'access_token',
                     'token_type',
                     'user' => ['id', 'name', 'email', 'role']
                 ]);
    }

    /**
     * Test 2: Έλεγχος ότι το σύστημα μπλοκάρει λάθος κωδικό με 401
     */
    public function test_user_cannot_login_with_invalid_password(): void
    {
        $user = User::create([
            'name'     => 'John Doe',
            'email'    => 'john@example.com',
            'password' => 'secret123',
            'role'     => 'admin',
        ]);

        $response = $this->postJson('/api/login', [
            'email'    => 'john@example.com',
            'password' => 'WRONG_PASSWORD',
        ]);

        // Επαληθεύουμε ότι απαγορεύτηκε η είσοδος με 401 Unauthorized
        $response->assertStatus(401);
    }
}

<?php

namespace Tests\Feature\Api;

use App\Models\User;
use App\Models\Client;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ClientTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test 1: Χωρίς Token, το σύστημα πετάει 401 Unauthorized
     */
    public function test_unauthenticated_user_cannot_access_clients(): void
    {
        $response = $this->getJson('/api/clients');

        $response->assertStatus(401);
    }

    /**
     * Test 2: Με έγκυρο Sanctum Token, ο χρήστης μπορεί να αποθηκεύσει πελάτη
     */
    public function test_authenticated_user_can_create_client(): void
    {
        // Συνδεόμαστε ως δοκιμαστικός χρήστης μέσω Sanctum
        $user = User::create([
            'name'     => 'Admin Tester',
            'email'    => 'tester@nexus.cy',
            'password' => 'admin',
            'role'     => 'admin',
        ]);
        Sanctum::actingAs($user);

        // Στέλνουμε τα δεδομένα του νέου πελάτη
        $response = $this->postJson('/api/clients', [
            'company_name' => 'AutoTest Corp',
            'vat_number'   => 'CY99988877',
            'email'        => 'autotest@corp.cy',
            'phone'        => '99001122',
        ]);

        // Επαληθεύουμε 201 Created
        $response->assertStatus(201);

        // Επαληθεύουμε ότι ο πελάτης υπάρχει όντως στον πίνακα clients!
        $this->assertDatabaseHas('clients', [
            'company_name' => 'AutoTest Corp',
            'vat_number'   => 'CY99988877',
        ]);
    }
}

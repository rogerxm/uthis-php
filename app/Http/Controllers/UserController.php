<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function store(Request $request)
    {
        // Valida los datos enviados por el usuario
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Crea un nuevo usuario con los datos proporcionados
        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')), // Se recomienda cifrar la contraseña
        ]);

        // Guarda el usuario en la base de datos
        $user->save();

        return response()->json(['message' => 'Usuario creado con éxito'], 201);
    }
}

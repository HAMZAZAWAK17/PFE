<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Liste des origines autorisées (peut être spécifiée en fonction de votre configuration)
        $allowedOrigins = [
            'http://localhost:3000', // Exemple pour une application React en développement
            // Ajoutez d'autres origines autorisées si nécessaire
        ];

        // Si l'origine de la demande est dans la liste des origines autorisées
        if (in_array($request->header('Origin'), $allowedOrigins)) {
            return $next($request)
                ->header('Access-Control-Allow-Origin', $request->header('Origin'))
                ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
                ->header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With')
                ->header('Access-Control-Allow-Credentials', 'true');
        }

        // Si l'origine de la demande n'est pas dans la liste des origines autorisées, continuez sans spécifier l'en-tête CORS
        return $next($request);
    }
}

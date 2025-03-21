<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommunityStoreRequest;
use App\Models\Community;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class CommunityController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $communities = Community::where('user_id', request()->user()->id)->paginate(5)->through(fn($community) => [
            'id' => $community->id,
            'name' => $community->name,
            'slug' => $community->slug,
        ]);

        return Inertia::render('Communities/Index', compact(var_name: 'communities'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Communities/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CommunityStoreRequest $request)
    {
        $user = request()->user();

        if (!$user) {
            return to_route('login')->with('message', 'Debes iniciar sesión para crear una comunidad.');
        }

        Community::create($request->validated() + ['user_id' => $user->id]);

        return redirect()->route('communities.index')->with('message', 'Comunidad creada.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Community $community)
    {
        Gate::authorize('update', $community);
        return Inertia::render('Communities/Edit', compact('community'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CommunityStoreRequest $request, Community $community)
    {
        Gate::authorize('update', $community);
        $community->update($request->validated());
        return to_route('communities.index')->with('message', 'Comunidad actualizada.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Community $community)
    {
        Gate::authorize('delete', $community);
        $community->delete();
        return back()->with('message', 'Comunidad eliminada.');
    }
}

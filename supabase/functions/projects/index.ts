import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const url = new URL(req.url)
    const method = req.method

    // GET /projects - Get all projects
    if (method === 'GET') {
      const { data, error } = await supabaseClient
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    // POST /projects - Create new project
    if (method === 'POST') {
      const formData = await req.formData()

      const title = formData.get('title') || ''
      const description = formData.get('description') || ''
      const tech = JSON.parse(formData.get('tech') || '[]')
      const githubLink = formData.get('githubLink') || ''
      const imageFile = formData.get('image')

      let imageUrl = ''
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`
        const { data: uploadData, error: uploadError } = await supabaseClient.storage
          .from('projects')
          .upload(fileName, imageFile)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabaseClient.storage
          .from('projects')
          .getPublicUrl(fileName)

        imageUrl = publicUrl
      }

      const newProject = {
        title,
        description,
        image: imageUrl,
        tech,
        github_link: githubLink
      }

      const { data, error } = await supabaseClient
        .from('projects')
        .insert(newProject)
        .select()
        .single()

      if (error) throw error

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 201,
      })
    }

    // PUT /projects/:id - Update project
    if (method === 'PUT') {
      const id = url.pathname.split('/').pop()
      const formData = await req.formData()

      const title = formData.get('title')
      const description = formData.get('description')
      const tech = formData.get('tech') ? JSON.parse(formData.get('tech')) : undefined
      const githubLink = formData.get('githubLink')
      const imageFile = formData.get('image')

      let imageUrl = undefined
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`
        const { data: uploadData, error: uploadError } = await supabaseClient.storage
          .from('projects')
          .upload(fileName, imageFile)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabaseClient.storage
          .from('projects')
          .getPublicUrl(fileName)

        imageUrl = publicUrl
      }

      const updateData = {}
      if (title !== null) updateData.title = title
      if (description !== null) updateData.description = description
      if (imageUrl !== undefined) updateData.image = imageUrl
      if (tech !== undefined) updateData.tech = tech
      if (githubLink !== null) updateData.github_link = githubLink

      const { data, error } = await supabaseClient
        .from('projects')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    // DELETE /projects/:id - Delete project
    if (method === 'DELETE') {
      const id = url.pathname.split('/').pop()

      const { error } = await supabaseClient
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error

      return new Response(null, {
        headers: corsHeaders,
        status: 204,
      })
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 405,
    })

  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})

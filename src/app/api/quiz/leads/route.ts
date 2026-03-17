import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const supabase = getServiceClient();
  const body = await request.json();

  const { first_name, last_name, email } = body;
  if (!first_name || !last_name || !email) {
    return NextResponse.json(
      { error: "first_name, last_name, and email are required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("quiz_leads")
    .insert({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      phone: body.phone || null,
      quiz_answers: body.quiz_answers || {},
      goal_scores: body.goal_scores || {},
      recommended_test_ids: body.recommended_test_ids || [],
      recommended_test_slugs: body.recommended_test_slugs || [],
      collection_preference: body.collection_preference || null,
      budget_preference: body.budget_preference || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}

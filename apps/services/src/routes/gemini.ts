export async function geminiEvaluation(c: any) { 

    const body = await c.req.json();
    console.log(await body, "BODY");
    return c.json({ status: 'ok',});
}
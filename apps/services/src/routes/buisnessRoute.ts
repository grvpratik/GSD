import { Hono } from "hono";
import { searchSubreddits } from "../intergrations/redditIntegration";


export const buisness = new Hono();

buisness.post('/',async(c)=>{
   const data=await searchSubreddits("solana",c)
   console.log(data)
   return c.json({res:"ok"})
})

buisness.post('/:id',)

buisness.post('/:id/edit')
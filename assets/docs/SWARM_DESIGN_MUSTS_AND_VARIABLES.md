Wow, wait, are you executing sub-agents? For visual design the best I've found so far is typically Opus 4.5 or Sonnet, though I do want to experiment more. 

Regarding there being two agents though, and then the defined options... might be worth me better describing what is profound and valuable about the process and what the parameters are for being able to make this happen. 

From a high level, the idea is that different LLM instances will take conceptually distinct pathways in coming up with ideas. These differences, particularly when compounded over rounds allowing the best of the ideas to build on themselves, result in really impressive results between agents. 

The different workflow commands use tactics like 'culling' or selecting the best ideas and cross pollinating them. Others bounce an idea back and forth between two agent instances, allowing their different conceptual pathways each to influence the project in different ways. 

Those are all more integrated and playful interpretations of methodology that is core: Which is just having a large handful of agent instances all being given the same directions — sometimes outright straight from a design specification — and other times, like our most successful example (`assets/workflow-library/specs/ui_component_spec.md`) by really digging into the design specifications by coming up with categories and variations, giving the agent a lot of creative room. It is important in all of these instances that it be emphasized that they should be really thinking through their ideas before executing them, allowing them to use all those assets and resources the `ui_component_spec.md` example provided. 

So the essentials: 

1. Important that there are a handful of separate agent instances; usually at least 6 but it depends on the number of ideas 
2. Important that there is some kind of overlap in the spec guide between the instances; the best variation comes conceptually, but examples of aesthetic directions they could take also work 
3. A variability in execution; so the "payment-site-homepage" is a really good example of this one because the visual ask was similar, but the interactive design needed to be really powerful

See how the other variables are sort of additional ways to pile on top of those essentials to try and get more interesting results. 

Check these out for how they structured the actual design swarm. I had to run them in different terminals because I was using the agents (Opus and Sonnet) so they all could work simultaneously through the phases in their own directory. This project structure was really effective because of the rounds of culling, and the clear guidelines. 

swarms/_archive/payments-site-homepage/homepage-starter/README.md
swarms/_archive/payments-site-homepage/homepage-starter/SWARM_SPEC.md

It was great because there were some that were underwhelming, and then others that did things we never would have thought of. Some of them didn't perform well, and others had really smooth reaction to the mouse movement of the interactive elements. 

In retrospect to that one, I would have loved for it to be more open to different designs. They all ended up a bit stuck to the same vibe. That is where the CMY Cube idea came into he picture because really, one of the results from that payments-site-homepage swarm could have taken towards an aesthetic more like that. 

In the end, the reason for the emphasis on the "best" command workflow and "best" spec was because of the structure weighing so heavily on the quality of the results. You sort of have to use vocabulary to carefully gate the LLMs from the common easy-outs they can often take. So the `ui_component_spec.md` was executed by using the `infinite.md` workflow where I picked in some cases 20 subagents (when you use subagents instead of agents you can run subagents in Claude Code simultaneously and just tell them what directory to work in. The agents need different instances running completely. Cursor does this by letting you pick a number of agents to run of whatever model, but in Cursor they put each one on a git branch. Maybe there is a method in Anti-Gravity? But my reason for liking the payments-site-homepage process was because of it not needing branches, and being able to use agents and not just subagents. 

I also really liked how they provided a main directory "payments-site-homepage/homepage-starter" with all the assets needed including the spec. And then how they were copied to "agent-x" directories right next to the main original. This structure allows me to go back in later and do it again with more agents next time. 

For this reason I think we should keep the original structure... 

swarms/<name-of-swarm-design>/<starter-with-directions> that then get copied when running the swarm 
swarms/<name-of-swarm-design>/<agent-1>
swarms/<name-of-swarm-design>/<agent-2>
swarms/<name-of-swarm-design>/<agent-...etc...8>
Swarms/<differnt-swarm-design>/<starter-with-directions>

I'm realizing now that keeping things this way, and not moving directories after placing them, will help us be able to go back and re-experiment in those "shops", and there is no worry about code breaking (as unlikely as it should be) with moving projects around. 

I do think we should keep a swarms/archive/ ... just to put the swarm design batches we don't like at all in there. I don' think we'll have any to put in there yet, but eventually I'd like to have to curate what is visible in the website by putting lesser batches in the archive. 

In the end, these specifics still aren't as important as the preemptive planning work. Giving them a big enough variety of ideas, or better yet, big enough variety of ways to combine parts of ideas. 

There is no rush on this — it is much more of an art project — this is about exploring the power of visual design when you can empower infinite LLM agents to create. It is like hiring 50 creative agencies to pick just one in the end (or your favorite part of a few of them). 

I think that it might make more sense for you to back up a bit and really dig through those old workflows and specs. See if you can come up with something as powerful as `ui_component_spec.md` that isn't so specifically about combining different types of UI components and instead is about different types of design. You'll want to consider all of the different designs you can muster, and then find ways they overlap or vibe together so that you can present them in that way. I provided all of the old files from the old specs and the old command workflows form .cursor because they had sooo much great language in them that I thought would come in handy, giving a head start of sorts for different aesthetic language that can be used in the spec prompt. 

My next question after that is going to be, if we are going to leave the swarm/ directory unmoving and just growing, how would you like to manage selecting specific swarms and of the swarms specific agent's results to have in the display on the website? For example, in "payments-site-homepage" there are only I think 4 that got to the last round. 

It would be cool for this method to be flexible because I'd love to go back into that swarm in the future and push those four favorites through a few more rounds to get them all even better. 

Is there a way to pick and choose which of the swarm design directory's agent results are in the showcase? Maybe even in a dynamic way? 

This building of the specs and workflows (or really just specs if we're going to continue for the workflow presented in "payments-site-homepage" for now since it is simple and it is the most modern one) -- and the building of the website to work symbiotically with the studio (thank you for coining studio and showcase so perf) are the two core system design challenges that probably should be focused on first before getting into the design of the actual website. How is it going to work, rather than what is it going to look like. 

I put this in a markdown so that you can copy parts of it for the READEME and such where we describe what swarm designing is and how it works. Its like, power in numbers and leveraging the unprecedented cheap creative thought to make as many of the same thing as possible to see their interpretations and their execution. It always ends up with spectacular results. I'll have to get screen shots of some of the old swarm design batches for you to understand later; the ui component one is wild! They are SOOOO diverse; none of them anything like the other and all interesting. 
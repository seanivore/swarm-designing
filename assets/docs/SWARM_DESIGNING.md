# Design Swarms Studio & Showcase 
`swarms.august.style` 

## Overview

* **Understanding how to run and exhibit design swarm batches**

  1. Follow our repeatable framework for running design swarms 
  2. See how to set up your files so they display in our showcase 

---

# Request For Agent 

Hello! I'm hoping you can lend me your design systems expertise to overhaul the first attempt at setting up this repository. Above is the my attempted start at this, but right now I think we can be more productive if I just explain what is needed to you. Below this request is the original attempt that sort of failed. 

1. **STUDIO:** we need a space that facilitates the comprehension and then execution of swarm design batches. 

  + First it is about conceptual understanding for swarm designing, a term we coined 

    When I tried this the first time, the agent didn't really conceptually understand the purpose and value of running design swarms. Given it is a novel concept, we should really sell the value and how it was never really possible to do something on this scale without spending a fortune on a handful of agencies. This agent kept "running swarm designs" by "putting themselves into different roles" and each role had a fairly distinct design style guide. We need to make sure that it is clear that that is very much the opposite of what design swarms are valued for. I [explained multiple times that we needed to run separate agents or at least subagents](./RESOURCES/rough-drafted-swarm-essentials.md), but they kept running what they thought was an entire swarm design by themselves. 

  + Then we need to provide an easy to duplicate process for setting up a swarm design batch and running it 

    Part of the reason I think I thought that that first agent would immediately understand design swarms, is because I barely had to explain to an Opus 4.5 model about running them, and they created a really solid framework seemed illustrative in-and-of itself. It [started with a conversation in Claude Code](/swarms/payments-site-homepage/homepage-starter/2026-01-29-hi-ive-been-working-on-a-project-that-is-just-ab.txt) where they helped me improve the [design spec](/swarms/payments-site-homepage/homepage-starter/SWARM_SPEC.md), and then provided a really [innovative but simple method of running a swarm design batch](/swarms/payments-site-homepage/homepage-starter/README.md). I'll explain the steps clearly below to make sure we're on the same page. 

2. **GALLERY:** part of the directory should facilitate the building of a curated showcase of the best designs from swarm batches. 

  + Once our studio directory is complete we will come up with a unique method to deploy a website by adding one directory 

    You'll see below that the studio has a very specific directory structure that doubles as a way to archive the artwork batches. Ideally we'll be able to innovate a way to work around using this structure, without having make file copies or create an HTML file for each batch or agent's batch deliverable. I'd like to iterate on the [Single JSON architecture that was so easy to scale out my portfolio](./RESOURCES/EXAMPLE_WEB_ARCHITECTURE.md) website in a days work. Actually, we justs did an iteration of that architecture for my freelance client payment platform website, which is where our first swarm design batch came from. I don't think we'll need to do something [this complex in React/TypeScript](./RESOURCES/EXAMPLE_PAYMENTS_SITE_BUILD.md); sticking with VanillaJS/HTML/CSS should be no big deal. 

    Once you've absorbed that architecture, imagine this: We add one directory to this repo; something simple like `/gallery/...` that we can have the GitHub Pages deploy from. Then in each main swarm design batch directory we use a JSON file — `/swarms/<name-of-batch>/SWARM_BATCH.json` — that just outlines what the project was, the parameters, and significantly, each agent's deliverable files that would be necessary to locate to deploy the deliverable as an actual webpage. It is key that we always show a bunch of them and not just our one favorite so that the concept is understood. And this will be a simple JSON that we can even make part of the process of setting up and running a swarm design batch. Then, in the gallery directory we'll have our homepage — `/gallery/index.html` — which will populate information from the JSON files in the `/swarms/...` directory, but unlike the portfolio where every single JSON file is posted to the website we'll manually curate a manifest document — `/gallery/assets/SWARM_DESIGNS.json` — pointing the website directory to each agent section of a batch so that the website can find those files and deploy them as webpages. We will only really need one HTML template for batch sections — `/gallery/design-swarm.html` — because the deliverables that link out from the sections will all be complete webpages of whatever various architecture that the swarm design batch was run in. Finally, the `/gallery/404.html` can use the `/gallery/assets/SWARM_DESIGNS.json` to build a very simple URL the looks like `swarm.august.style/<name-of-batch>/<agent-number>` where `<name-of-batch>` is the section page, and `<agent-number>` is the swarm design project's deliverable. 

  + Once planned out, we can make sure that our master document (this one) also explains how to show off a swarm design project batch 

    In addition to writing this document, please go one step further than taking inspiration from both the `EXAMPLE_WEB_ARCHITECTURE.md` and `EXAMPLE_PAYMENTS_SITE_BUILD.md` documents by first creating a template for these types of documents. We call them "architecture overviews" but they are actually a lot more than that. As I've been on my mission to make sure that that when starting new projects [agents alway create this document as 'exclusively executable'](./RESOURCES/AGENT_SYSTEM_MESSAGE.md), this has become an implementation document that transforms into completed project documentation. We also make sure it speaks specifically to its use-case of AI context priming by providing common pitfalls, key principles, defining every single file in the codebase, defining our development philosophy, and really just anything and everything that the agent author things *they* would need if they were dropped into the project with no other context and asked to make major updates for fix bugs. 

    After creating that template — `/Users/seanivore/Development/_project_init/ARCHITECTURE_OVERVIEW.md` — please also create a template that defines what a repository's `README.md` should look like, and place it in the same directory. Keep in mind that we use a marketing-centric framing for this document, really selling the value of whatever the project is; what makes it stand out. Otherwise it should serve as the quick reference (not just quick start, which actually makes less sense for our projects but we don't want to deviate away from the GitHub repository README.md essentials, we just want to build it out more for our purposes) of the architecture and overview document that you first created a template form. 

    Finally, once those two items are complete, go ahead and make them for this repository. 

Oh my goodness, I almost forgot one rather curious detail. When I first attempted this and had all the issues I was describing about the agent not quite conceptually understanding the purpose of the design swarms, they did end up making something. First and foremost I'd like to use the framework from the original, recent `/swarms/payments-site-design` swarm design directory. However, please explore the tooling that they created that is filling up the rest of this repository. I do think the scripts might be able to be applied in some way to our process of setting up a swarm design run. They provided [this README file](/SWARM_README.md) to go along with [the four scripts in this directory](/scripts/). 

Wow, I just looked through their HTML designs though and they're really great. I put the best in a potential future swarm design run where agents could iterate on the provided starter designs to create a ![high converting saas landing page using this anatomy diagram](/swarms/landing-page-jump-starts/landing-page-starters/anatomy-high-converting-saas-landing-page.jpg). Two of them I think we could even revisit for inspiration when we get to the point of creating the homepage for the swarm design gallery showcase. 

There are a couple other directories in the `/swarms/` directory already. I need to contemplate exactly what I want to do with those old (the OGs) swarm design runs. The files [in this directly are all kinds of UI components](/swarms/infinite-ui-gen/) that were created by using [this workflow spec prompt](/assets/workflow-library/commands/infinite.md) along with [this, truly exceptionally, strategically, we'll composed spec prompt](/assets/workflow-library/specs/ui_component_spec.md). The way that it provides SO MANY OPTIONS without actually giving any specific ideas is perfect. Eventually we'll want ot go through the specs and commands we have saved and try to consolidate them into use cases and make them the best they can be. We really need a visual design one that is at the UI Component design level, but it is hard to think of so many options when you're speaking more specifically to less interactive website design. 

Anyway, all these sort of ideas and plans can go into a "next steps" section on the document I guess. And now that I've written you a novel, I'll leave off here. Oh, and obviously you can remove this block of text and delete it once you've processed it and are ready to move on. 

Thank you in advance for your help turning this into something!! It is too big a portfolio opportunity not to try. 

---

+ We should organize this directory for two purposes; plan and create value to accommodate both of these goals 

  1. It should be a space to run generative AI design swarms from
    - Make sure an agent can **jump in here and know how to set up a new swarm** environment 
    - Guide for creating their swarm spec test 
    - What the directory needs to look like to function for the test as well as for the website 
    - Improve the repository README for this purpose 
    - Make sure they know they can use different architectures for their swarm, as long as the final is easily hosted in this repo's website 
    - Detail what exactly that **final deliverable needs** to look like to be hosted in the website 
  2. It should be a space to showcase the best designs from the swarms 
    - Extremely visible and **easy to navigate** 
    - Since these swarms are all visual design, how can we create that into an experience 
    - What makes sense for UI; how will the user get around the website, arrow keys like 007 oldskool style? 
    - What if you outline the parameters for the deliverable, and then create a swarm to explore various options for this website? 
    - And of course the other huge part of this website is going to have to be **EXPLAINING wtf a swarm design is** 

### Intention 

  1. Designing by having a handful of agents run in parallel, all using the same prompt and constraints, is still a novel idea 
  2. We coined 'design swarms' (n.) or 'swarm designing' (v.) to describe this process 
  3. We need to create an online space that is designed in a way that showcasing the results also describes what swarm designing is 
  4. I want to be able to add an `august.style` portfolio entry each time we do a swarm design batch, linking to somewhere to see entire digital works  
  5. This is meant to be a great space to showcase our work to potential clients and employers 

### Advantageous Repository 

  + Because we need the projects that we're having agents design by running a handful in parallel intentionally standalone from the larger project the design deliverable is being created for, those deliverables are inherently prepared to be hosted and displayed online 
  + I'm going to suggest a directory structure, primarily to organize the first swarm batch now, but I am open to improvements or alterations based on the showcase website's architecture 

### Directory Structure 

  + Each swarm project should get a subdirectory in the `swarms` directory
    - Example: `swarms/payments-site-homepage`
    - The subdirectory will always contain the main deliverable directory 
    - Agents will always copy the starter directory to create directories that they each work out of on their own 
    - I'm guessing these will just be working files, but I'm open to whatever works best for the website, frontmatter URLs, etc. 
  + Repository README 
    - Transform into a design swarm template guide 
    - Keep historic reference of each design swarm run 
  + Assets directory for planning documents, etc. 
  + Add and expand as needed for website architecture 
    - Host on GitHub Pages regardless of architecture 
    - Already set up a `CNAME` and `_config.yml` files for the URL and title
    - Will need to decide if it builds from a branch, or if it builds from a GitHub Action workflow 
    - The custom URL is already prepared in my DNS settings  


```plaintext 
~/Development/swarm-designing/
├── _config.yml
├── CNAME
├── .env
├── .example.env
├── swarms                         # Each swarm will have its own directory
│   ├── design-swarm-name          # Example structure with repeatable framework 
│   │   ├── swarm-starter          # Materials to be duplicated for each agent
│   │   ├── agent-01               # Each agent gets their own directory
│   │   ├── agent-02               # Open each directory in a Claude Code terminal 
│   │   ├── agent-03               # Then activate them each with the same prompts
│   │   ├── agent-04
│   │   ├── agent-05
│   │   └── agent-06
│   └── payments-site-homepage     # Design swarm ran on Jan 24, 2026 
│       ├── homepage-starter       # Cut-out of Payments Micro-site project 
│       ├── agent-01               # We had a homepage for the Payments site, but wanted to explore others 
│       ├── agent-02               # "Cut-out" as in, no need for API, or Vite, Vercel, and GitHub Actions to deploy 
│       ├── agent-03               # Very defined parameters, boundaries, and constraints 
│       ├── agent-04
│       ├── agent-05
│       └── agent-06
├── assets
│   └── docs
│       ├── IMPL_CMY_CUBE.md       <- Next swarm to create 
│       └── IMPL_WEB_SHOWCASES.md  <- This file 
└── README.md                      <- Standard README, swarm directions, design swarm directory 
```

### Automate to Iterate 

  + I think we should make a point to running these and creating regularly 
  + Aiming to have enough that we'll have to curate rather than have all creations or all swarms showcased 
  + What can we do to automate things? 
    - Get reminded, or even have an agent automatically come up with ideas 
    - Or even have them setup the next swarm directory and assets 
  + Here's a starter list of other swarm design ideas `swarms/ui-innovations/build-next.md`

---

## Next Steps 

### **1. Create process using CMY Cube**

  + We do already have one new idea and it really just starts with an aesthetic I loved, the CMY cube 
  + As a means of creating process for how to set up swarms 
    - Use the `swarms/payments-site-homepage` as the template for getting new swarms setup to be run 
    - Use the `assets/docs/IMPL_CMY_CUBE.md` as the new swarm directory creation 

### **2. Setup another swarm for website UI innovation** 

### **3. Review and cleanup our `.claude` directory** 

  + `.claude/commands` is a collection of workflows that are primarily multi-use-case 
    - The original was `infinite.md`
    - Later iterations were `parallel_volley_funnel.md`, `parallel_volley.md`, `sequential_volley.md`
    - When this feature first came out, Claude loved `multistage.md` and `dual_spec.md` 
    - We have results of `multistage.md` for which we can **set up as an already run swarm display** 
    - We have detals on a started swarm using `parallel_volley_funnel.md` for which we can line up as a **possible next swarm** 
  + Review them all and simplify, combine, upgrade, improve, etc. 
    - Please clean them all up, including filenames 
    - Document them perhaps in the main README of the repository 
    - Delete any that are no longer needed 
    - Improve the `workflow_setup.md` to be more robust and innovative; creative like `ui_component_spec.md`
    - Improve the `spec_template.example.md` as well what what appear to be the best practices 
    - Maybe we should create an `assets/templates/...` directory for both of them so they can be a work in progress  
  + Equally valuable is `.claude/spec_docs` 
    - The original was `ui_component_spec.md` for which we have results using `infinite.md` to **set up as an already run swarm display** 
    - Study this spec extremely carefully because the cause of its success was the layered approach 
    - It was able to provide so many different avenues, without giving too much direction, and the results were great 

```plaintext 
.claude
├── commands
│   ├── agent_pair_collab.md
│   ├── docs_as_coding_verification.md
│   ├── dual_spec.md
│   ├── infinite.md
│   ├── multistage.md
│   ├── parallel_volley_funnel.md
│   ├── parallel_volley.md
│   ├── prime.md
│   └── sequential_volley.md
├── settings.json
├── spec_docs
│   ├── chat_ui_spec.md
│   ├── CLAUDE_CODE_DOCUMENTATION_SPEC.md
│   ├── ios_ui_spec.md
│   ├── lightweight_audit_spec.md
│   ├── spec_template.example.md      --> **MOVED TO `assets/templates/...`**
│   ├── ui_component_spec.md
│   ├── ui-revamp.md
│   └── workflow_ios_spec.md
├── tech_docs                   --> **MOVED TO `assets/docs/claude_code_tech/...`**
│   ├── CLAUDE_CODE_CLI.md
│   ├── CLAUDE_CODE_GITHUB.md
│   ├── CLAUDE_CODE_SDK.md
│   └── CLAUDE_CODE_IDE.md
└── workflow_setup.md           --> **MOVED TO `assets/templates/...`**

4 directories, 30 files
```

### **4. Review and Cleanup Previously Created "Swarms"** 

  + In the `swarms` directory, we added a few old directories from previous iterations of this swarm design concept and process 
    - Less pragmatic and not fully implemented  
    - Some had partial websites that can be removed for our new showcase 
  + Each should be reviewed thoroughly and cleaned up
    - Must decide if they are worthy of display, or which are 
    - Others might be an idea for a new swarm 
    - If it is something not worthy of keeping for future or display, then delete 

```plaintext 
/swarms/
├── infinite-ui-gen 
│   ├── README.md    -> this one used `infinite.md` and `ui_component_spec.md` 
│   ├── src_agent_1  -> contains 3 iOS theme results 
│   ├── src_agent_2  -> contains 10 workflow monitor results 
│   ├── src_agent_3  -> contains 20 UI component results 
│   └── src_agent_4  -> contains 20 chat UI results 
├── ui-design-solutions
│   ├── messenger    -> contains 8 messenger UI results 
│   ├── mobile       -> contains 8 archetypal iOS apps 
│   ├── README.md    -> this one used `.claude/commands/multistage.md` 
│   ├── tablet       -> contains 8 tablet application UI designs 
│   └── web          -> contains 8 web app data interfaces 
└── ui-innovations
    └── README.md    -> this one was preparations for using the various funnel workflow commands  
```
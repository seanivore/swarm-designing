# Swarm Design Functional & Display Repository Implementation
`swarms.august.style` 

## Overview

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
├── swarms
│   └── payments-site-homepage
│       ├── homepage-starter
│       ├── agent-01
│       ├── agent-02
│       ├── agent-03
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
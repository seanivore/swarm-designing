# Web Showcase Implementation 
`swarms.august.style` 

## Overview

+ We should organize this directory for two purposes 

  1. It should be a space to run generative AI design swarms from 
  2. It should be a space to showcase the best designs from the swarms 

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


```plaintext 
~/Development/swarm-designing/
├── _config.yml
├── CNAME
├── .env
├── .example.env
├── swarms
│   └── payments-site-homepage
│       ├── homepage-starter
│       ├── agent-01
│       ├── agent-02
│       ├── agent-03
│       ├── agent-04
│       ├── agent-05
│       └── agent-06
├── assets
│   └── docs
│       ├── SWARM_IDEAS.md         <- Ideas for swarms to run, with links to the showcase website for each swarm
│       └── IMPL_WEB_SHOWCASES.md  <- This file 
└── README.md                      <- Standard README, swarm directions, design swarm directory 
```
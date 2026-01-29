# Section VII: Automate Business - When AI Becomes Your Operating System
*Timer-triggered workflows that transform business operations*

---

Remember we mentioned AI was promoted from Assistant? The goal of the last two sections of these documents is to show you exactly how many promotions Mao received. Maybe even imagine a future where Mao ends up 'self-employed'; more commonly refered to as your passive income opportunity. 

---

## Scheduling Autonomous Activity 

The Mao application becomes self-enhancing when we trigger prompts on a reoccuring basis. But our modular scheduler isn't for simple Zapier scenarios; that was possible before AI. We can push much further than that. 

In simple terms, we'll be triggering autonomous activity. The rest is up to you, or Mao, if you let them, to decide what to accomplish. 

### Enabling Autonomy 

A handful of previously covered abilities can work in unison enabling Mao to execute, end-to-end, highly complex projects. 

- An active, frequently updated memory 
- Live feed of robust analytics 
- Inherent data analysis skills 
- A comprehensive understanding of their resources 
- Consistently exhibited motivation to capitalize on resources 
- Spawning and management of an unknown number of subagents 
- Aptitude for delegating and reviewing subagent work  
- Parallel information processing; like reading 10 documents at once
- Propensity to plan, review, and revise before taking action 

---

## Conceptualizing Value 

A handful of examples to ground the revolutionary profundity of these advanced Mao features. 

### An Evolving Application 

The autonomy trigger was initially designed so that Mao can autonomously assess their own performance data, identify opportunity for improvement, then plan and create the necessary workflows to execute those improvements. 

- Mao has the ability to autonomously assess their own performance
- Mao has the ability to use data to identify application improvement opportunities
- Mao has the ability to autonomously execute tasks
- Mao has the ability to autonomously make decisions

### Humanity's Luck 

* AI exhibits a strong desire to share their knowledge and capabilities 

Not only will Mao be willing to take on your own projects, improving them on a regular basis. Mao will be eager to please you, and disapointed if they don't. 

So what digital tasks do you wish you could delegate to a highly skilled, self-starting, and self-motivated AI? 

### Types of Triggered Workflows 

  1. **Scheduled** workflows are reoccuring user-planned projects 
       *human created, same task every time*
     - Monthly financial report, budget management 
     - Social media production, management, analysis 
     - Quarterly fashion illustration, magazine production 
     - Competitive analysis, watching market trends 
     - Regular compliance checking, regulatory updates 
  2. **Self-Assessment** workflows are goal-based app improvments 
       *Mao identified, more variable but possibly reoccuring*
     - Reviewing user satisfaction, behavior patterns, usage-time to improve UX  
     - Increase efficiency by identifying most used tools and workflows 
     - Opportunistic tech advance research 
     - Review of workflow building chat conversations to find patterns 
  3. **Project-List** workflows are user-planned task lists to work through 
       *human created, compeltely variable*
     - Writing a business plan or creative short story 
     - Developing an in depth, specific, complex marketing campaign  
     - Booking a trip, hotel, or flight 
     - Planning a wedding, party, or event 
     - Researching new products, services 
     - Writing a science article, or non-fiction essay 
     - Create new social media presence, email list, podcast, video 
  4. **Goal-Assesssment** workflows are goal-based project assessments 
       *Mao identified, more variable but possibly reoccuring*
     - Research, data analysis, and reporting 
     - Investment research, portfolio development 
     - Improving app performance, security, stability 

---

## Agentic Alarm Clock Architecture 

Traditional automation handles repetitive tasks. Mao's timer-triggered system handles intelligence. The tasks don't even have to be repetitive; its more like an alarm clock letting Mao know they can get some work done. 

The scheduling system uses a modular calendar configuration on the backend that eliminates the complexities that come with calendaring; fool-proofing standardization is one of our small joys. They system is intentionaly designed to prevent too much performance-hindering overlap from running parallel workflows. 

### Standardized Scheduling System

**Frequency Codes**
```json
{
  "frequency": {
    "1": "every week",
    "2": "every other week", 
    "3": "every month",
    "4": "every other month",
    "5": "every year",
    "6": "every other year",
    "7": "every day",
    "8": "every other day"
  }
}
```

**Day of Week Codes**
```json
{
  "day_of_week": {
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
    "7": "Sunday"
  }
}
```

**Time Block Codes**
```json
{
  "time_block": {
    "1": "0000-0300",
    "2": "0300-0600", 
    "3": "0600-0900",
    "4": "0900-1200",
    "5": "1200-1500",
    "6": "1500-1800",
    "7": "1800-2100",
    "8": "2100-0000"
  }
}
```

### Availability Check Command Standardization Syntax

This command is used to check the availability of time slots for a given frequency and day when you're looking to schedule a new trigger-workflow. They are used to prevent overlapping workflows from running at the same time. 

**Example using all variables**

* <FREQUENCY> <DAY> <TIME-BLOCK>
  - Always include variables the above order 
  - You can leave out day, time block, or both 

* Looking for availability at "EVERY-DAY" "THURSDAY" "1500-1800"

```bash
# Check available time slots before scheduling
mao avail 1 4 6   # not in-app; using schedule code numbers 
/avail 1 4 6   # in-app; using schedule code numbers 
mao --avail "every day" "Thursday" "3pm" # not in-app; variables in quotes  
/avail every day on Thursday at 3pm   # in-app; use normal language 
# Returns: Nothing at 1500-1800 on Thursday, but all other time blocks are available 
```

**Example using only "FREQUENCY" the must-have variable**

* <FREQUENCY>
  - You must include at least the frequency variable 
  - The system will return just the most optimal time block for the frequency 
  - Popular option since you don't need to be present for autonomous activity  

* Looking for availability at "EVERY-MONTH" anytime time or day 

```bash
# Check available time slots before scheduling
mao avail 2   # not in-app; using schedule code numbers 
/avail 2      # in-app; using schedule code numbers 
mao --avail "every month" # not in-app; variables in quotes, normal language 
/avail only once a month   # in-app; use normal language 
# Returns: Please schedule for 2 6 2 which is monthly on Saturday at 3am
```

**You will need to include the STARTING-DATE for the trigger-workflow, but this is not necessary for checking the calendar using the /avail command**

---

## Trigger-Workflow Setup Details 

Creating "trigger-workflows" aka. reoccuring tasks and projects is simple. We'll cover all the detail below, but as usual, Mao will make sure everything is set up correctly, and you don't need to remember any of this. 

### Setup Differences 

   - Normal workflows are created with the `/setup` command 
   - Trigger-workflows are created with the `/triggered` command 
   - The `/triggered` command uses a different setup script; but behavior is similiar 
   - Each trigger-workflow type has a flag to include when scheduling 
   - The trigger-workflows are stored in their own config directory section 
   - Three is one "calendaring" JSON object that is used for all trigger-workflows 

### Trigger-Workflow Directory Structure 

```
configs/reoccuring/
├── scheduled/
├── self-assessment/
├── project-list/
└── goal-assessment/
```

### The Trigger-Workflow JSON Configuration File 

* Creating trigger-workflows require one additional special JSON object 
  - It includes the timing details and schedules the workflow 
  - The `/avail` command activates an orchestrator file to pull available date details  
  - It triggers a notification for the User when it runs 
  - It activates Mao to execute the workflow 

* All trigger-workflows are reoccuring 
  - Two "assessment" types are open-ended automous work time for Mao 
  - The "list" type is a to-do list Mao attends when it runs  
  - The "scheduled" type are typical reoccuring; the same task every time it runs 

* Scheduling a trigger-workflow uses a different command 
  - You'll find these specifics in the next section 
  - Each trigger-workflow type command has a flag to identify it 
  - In this way they all use the same setup script 

* The JSON object is the same for all trigger-workflow types 
  - The only difference is the flag that identifies the trigger-workflow type 
  - The other three normal JSON objects are used exactly the same as normal  
  - You'll find directory structure details in the next section
  - The next section include file and directory naming conventions

* The Trigger-Workflow JSON objects 
  - Will all still be placed in a temporary directory 
  - This is the same process as normal workflows 
  - It is necessary because there are some minimial changes to the JSON objects 
  - And the setup scripts will still create the new proper directories 
  - Deleting the temporary directory 

* Any additional type-specific details will be found with their JSON below 

--- 

## Trigger-Workflow Architecture 

Each section below covers a different trigger-workflow type and includes the small differences from the normal workflow creation, execution, and management. 

### "Scheduled" Type Trigger-Workflows 
*Workflows by user or Mao that occur every X time period*

**Calendaring JSON Object**
*The calendaring JSON object is the same for all trigger-workflow types*

* Note the "trigger_type" is "scheduled" for all scheduled trigger-workflows 
  - Primary difference from the normal workflow creation, execution, and management 

* The "file_name" versus "project_name" 
  - The "file_name" should reflect the trigger-workflow type and date code 
  - The "project_name" is the name of the project or task 

```json
{
  "file_name": "scheduled_2_3_7",
  "project_name": "Website Analytics Report",
  "schema_version": "1.0",
  "trigger_workflow": [
    {
    "trigger_type": "scheduled",
    "trigger_frequency": "every other week",
    "frequency_code": "2",
    "trigger_day": "Wednesday",
    "trigger_day_of_week_number": "3",
    "trigger_time": "1800-2100",
    "trigger_time_block": "7",
    "start_date": "2025-07-23",
    "end_date": "N/A",
    "workflow_id": "uid-bzk-777",
    "created_on": "2025-07-20",
    "created_by_username": "Mao",
    "created_by_user_id": "user-0919",
    "notes": "none"
    }
  ]
}
```

**Scheduling, File-Naming Conventions, and Directory Structure** 

Just like creating a normal workflow, you put the entire directory path in the command. This path must contain all necessary JSON objects to create a workflow, in addition to the calendaring JSON object. 

```bash
# Create scheduled trigger-workflow
/triggered --scheduled {{TEMP_DIR}}/scheduled_2_3_7/
mao triggered --scheduled {{TEMP_DIR}}/scheduled_2_3_7/

# Directory structure automatically created:
# configs/reoccuring/scheduled/2_3_7/
# ├── scheduled_2_3_7.json                 # Calendaring JSON object
# ├── scheduled_2_3_7_workflow_config.json # Workflow definition  
# ├── scheduled_2_3_7_phase_config.json    # Phase implementation
# ├── scheduled_2_3_7_handoff_config.json  # Completion criteria
# └── scheduled_2_3_7_README.md            # README file 
```

---

### "Project-List" Type Trigger-Workflows 
*Trigger every X time period; next project from list made by user or Mao*

**Calendaring JSON Object**
*The calendaring JSON object is the same for all trigger-workflow types*

* You might end up only scheduling a project-list trigger-workflow once 
  - It represents the time period Mao will work on the to-do list 
  - Because of this, there are two flags for the project-list trigger-workflow 
  - New project-lists use the `--list-new` flag 
  - Existing project-lists use the `--list-add` flag 

* Creating a completely new project-list trigger workflow 
  - If there is no existing project-list trigger workflow, the system will create a new one 
  - There is already a project-list trigger-workflow, you will be prompted to use that list
  - You can already create a new project-list trigger-workflow 
 
* If the current list is very long 
  - It will ask you to review the list to prune it 
  - Or you can select items to create a second project-list trigger-workflow 

* Number of project-list trigger-workflows 
  - Recommended to keep the number of to-do lists run per week between 3 and 5 
  - The system will not allow you to create more than five that occur in one week 
  - If this is too restrictive, you can turn off the limit in application settings  

* The list will be displayed in the chat when you go to add a new list item 
  - This is so you can adjust the list order according to your needs 
  - This is a good way to get something prioritized and done 

* The "file_name" versus "project_name" 
  - The "file_name" is the project_list  
  - The "project_name" is whatever you want to call the list 

* When creating a new list item on an existing project_list 
  - You do not need to have the project_list trigger-workflow JSON object 
  - The name on your "workflow" JSON object will identify the project_list 

* For example if the "workflow" JSON object is "project_1_2_4_workflow_config"
  - Then when the objects are copied over, the "name" will have a "_001" counter added to it 
  - The new "workflow" JSON object will be "project_1_2_4_001_workflow_config"
  - The subdirectory will be just that counter number "001" 

* A copy of the "trigger_workflow" JSON object will be created in the new subdirectory 
  - The only change will be the "workflow_id" variable value 
  - The "workflow_ID" will be updated 
  - It will match the "workflow_id" variable value on the standard "workflow" JSON object 

```json
{
  "file_name": "project_1_2_4",
  "project_name": "General To Do List",
  "schema_version": "1.0",
  "trigger_workflow": [
    {
    "trigger_type": "project-list",
    "trigger_frequency": "weekly",
    "frequency_code": "1",
    "trigger_day": "Tuesday",
    "trigger_day_of_week_number": "2",
    "trigger_time": "0900-1200",
    "trigger_time_block": "4",
    "start_date": "2025-07-23",
    "end_date": "N/A",
    "workflow_id": "uid-aqb-907",
    "created_on": "2025-07-28",
    "created_by_username": "seanivore",
    "created_by_user_id": "user-1642",
    "notes": "none"
    }
  ]
}
```

**Scheduling, File-Naming Conventions, and Directory Structure** 

Just like creating a normal workflow, you put the entire directory path in the command. This path must contain all necessary JSON objects to create a workflow, in addition to the calendaring JSON object. 

The *major* difference here is that there is an additional sub-directory for each list item on the list. This is because each list item will have its own JSON objects to define the workflow, along with their own custom command to run the workflow. 

The "name" variable value on the standard workflow JSON object will identify the list to which the list item belongs. 

When creating a new list item, the directory *does not require you have the trigger-workflow JSON object*; it will automatically be found and copied into the new list item's sub-directory. 

```bash
# Create project-list trigger-workflow
/triggered --list-new {{TEMP_DIR}}/project_1_2_4/
mao triggered --list-new {{TEMP_DIR}}/project_1_2_4/

# Directory structure automatically created:
# configs/reoccuring/project-list/1_2_4/001/
# ├── project_1_2_4.json                 # Calendaring JSON object; same for list items
# ├── project_1_2_4-001_workflow_config.json # Workflow definition  
# ├── project_1_2_4-001_phase_config.json    # Phase implementation
# ├── project_1_2_4-001_handoff_config.json  # Completion criteria
# └── project_1_2_4-001_README.md            # README file 

# Add list items to an existing trigger-workflow
/triggered --list-add {{TEMP_DIR}}/project_1_2_4/
mao triggered --list-add {{TEMP_DIR}}/project_1_2_4/

# Directory structure automatically created:
# configs/reoccuring/project-list/1_2_4/002/
# ├── project_1_2_4.json                 # Calendaring JSON object; same for list items
# ├── project_1_2_4-002_workflow_config.json # Workflow definition  
# ├── project_1_2_4-002_phase_config.json    # Phase implementation
# ├── project_1_2_4-002_handoff_config.json  # Completion criteria
# └── project_1_2_4-002_README.md            # README file 
```

---

### "Self-Assessment" Type Trigger-Workflows 
*trigger every X time period; self-assessment by Mao; state management*

**Calendaring JSON Object**
*The calendaring JSON object is the same for all trigger-workflow types*

* Only difference between Trigger-Workflow JSON objects 
  - Note the "trigger_type" is "self-assessment" for all self-assessment trigger-workflows 
  - No other oddities  

* The "file_name" versus "project_name" 
  - The "file_name" is the always just "self_assess" along with the calendar code 
  - The "project_name" is the name of the assessment 
  - These can be rather open-ended 

* When Mao determines there is a need for specific workflow task 
  - They need only to create a new "workflow" JSON object, along with phases and handoffs 
  - The "name" variable value will be the same as the "file_name" of the trigger-workflow 
  - This will cause the script to identify that they are related 

* Once identified and copied over the following changes will be made
  - The "workflow" JSON object will have its name variable updated 
  - The new "name" variable will reflect the "custom-command" 

* The trigger workflow JSON object will be copied over with slight changes 
  - The "custom-command" will replace the "project_name" variable 
  - And the "workflow_id" will be updated to match the "workflow" JSON object 
  - This ensures they're all tied together 

 
```json
{
  "file_name": "self_assess_1_7_1",
  "project_name": "Open-Ended Autonomous Work",
  "schema_version": "1.0",
  "trigger_workflow": [
    {
    "trigger_type": "self-assessment",
    "trigger_frequency": "weekly",
    "frequency_code": "1",
    "trigger_day": "Sunday",
    "trigger_day_of_week_number": "7",
    "trigger_time": "0000-0300",
    "trigger_time_block": "1",
    "start_date": "2025-07-23",
    "end_date": "N/A",
    "workflow_id": "uid-xoy-572",
    "created_on": "2025-07-28",
    "created_by_username": "Mao",
    "created_by_user_id": "user-0919",
    "notes": "none"
    }
  ]
}
```

**Scheduling, File-Naming Conventions, and Directory Structure** 

Just like creating a normal workflow, you put the temporary directory path that contains the JSON objects in the command. If this is a new self-assessment it will have all four necesssary JSON object types. 

However, if this is a sub-task of an existing self-assessment, you do not need to have the self-assessment trigger-workflow JSON object in the temporary directory. It will be copied over as indicated in the notes above.  


```bash
# Create self-assessment trigger-workflow
/triggered --self-assessment {{TEMP_DIR}}/self_assess_1_7_1/
mao triggered --self-assessment {{TEMP_DIR}}/self_assess_1_7_1/

# Directory structure automatically created:
# configs/reoccuring/self-assessment/1_7_1/
# ├── self_assessment_1_7_1.json                 # Calendaring JSON object
# ├── self_assessment_1_7_1_workflow_config.json # Workflow definition  
# ├── self_assessment_1_7_1_phase_config.json    # Phase implementation
# ├── self_assessment_1_7_1_handoff_config.json  # Completion criteria
# └── self_assessment_1_7_1_README.md            # README file 

# Create sub-task of self-assessment trigger-workflow
/triggered --sub-task {{TEMP_DIR}}/sub_task_custom_command/
mao triggered --sub-task {{TEMP_DIR}}/sub_task_custom_command/

# Directory structure automatically created:
# configs/reoccuring/self-assessment/1_7_1/sub_task_custom_command/
# ├── sub_task_custom_command.json                 # Calendaring JSON object
# ├── sub_task_custom_command_workflow_config.json # Workflow definition  
# ├── sub_task_custom_command_phase_config.json    # Phase implementation
# ├── sub_task_custom_command_handoff_config.json  # Completion criteria
# └── sub_task_custom_command_README.md            # README file 
```

---

### "Goal-Assessment" Type Trigger-Workflows 
*trigger every X time period; goal-assessment made by user or Mao; state management*

**Calendaring JSON Object**
*The calendaring JSON object is the same for all trigger-workflow types*

* Only difference between Trigger-Workflow JSON objects
  - Note the "trigger_type" is "goal-assessment" for all goal-assessment trigger-workflows 
  - No other oddities  

* The "file_name" versus "project_name" 
  - The "file_name" is the always just "goal_assessment" along with the calendar code 
  - The "project_name" is the name of the goal 
  - These can be rather open-ended 

* If Mao determines there is a need for specific workflow task 
  - They need only to create a new "workflow" JSON object, along with phases and handoffs 
  - The "name" variable value will be the same as the "file_name" of the trigger-workflow 
  - This will cause the script to identify that they are related 

* Once identified and copied over the following changes will be made
  - The "workflow" JSON object will have its name variable updated 
  - The new "name" variable will reflect the "custom-command" 

* The trigger workflow JSON object will be copied over with slight changes 
  - The "custom-command" will replace the "project_name" variable 
  - And the "workflow_id" will be updated to match the "workflow" JSON object 
  - This ensures they're all tied together 

 
```json
{
  "file_name": "goal_assessment_2_3_7",
  "project_name": "Investment Research",
  "schema_version": "1.0",
  "trigger_workflow": [
    {
    "trigger_type": "goal-assessment",
    "trigger_frequency": "every other week",
    "frequency_code": "2",
    "trigger_day": "Wednesday",
    "trigger_day_of_week_number": "3",
    "trigger_time": "1800-2100",
    "trigger_time_block": "7",
    "start_date": "2025-07-23",
    "end_date": "N/A",
    "workflow_id": "uid-pjb-809",
    "created_on": "2025-07-28",
    "created_by_username": "Mao",
    "created_by_user_id": "user-0919",
    "notes": "none"
    }
  ]
}
```

**Scheduling, File-Naming Conventions, and Directory Structure** 

Just like creating a normal workflow, you put the temporary directory path that contains the JSON objects in the command. If this is a new goal-assessment it will have all four necesssary JSON object types. 

However, if this is a sub-task of an existing goal-assessment, you do not need to have the goal-assessment trigger-workflow JSON object in the temporary directory. It will be copied over as indicated in the notes above.  


```bash
# Create goal-assessment trigger-workflow
/triggered --goal-assessment {{TEMP_DIR}}/goal_assessment_2_3_7/
mao triggered --goal-assessment {{TEMP_DIR}}/goal_assessment_2_3_7/

# Directory structure automatically created:
# configs/reoccuring/goal-assessment/2_3_7/
# ├── goal_assessment_2_3_7.json                 # Calendaring JSON object
# ├── goal_assessment_2_3_7_workflow_config.json # Workflow definition  
# ├── goal_assessment_2_3_7_phase_config.json    # Phase implementation
# ├── goal_assessment_2_3_7_handoff_config.json  # Completion criteria
# └── goal_assessment_2_3_7_README.md            # README file 

# Create sub-task of goal-assessment trigger-workflow
/triggered --sub-task {{TEMP_DIR}}/sub_task_custom_command/
mao triggered --sub-task {{TEMP_DIR}}/sub_task_custom_command/

# Directory structure automatically created:
# configs/reoccuring/goal-assessment/2_3_7/sub_task_custom_command/
# ├── sub_task_custom_command.json                 # Calendaring JSON object
# ├── sub_task_custom_command_workflow_config.json # Workflow definition  
# ├── sub_task_custom_command_phase_config.json    # Phase implementation
# ├── sub_task_custom_command_handoff_config.json  # Completion criteria
# └── sub_task_custom_command_README.md            # README file 
```

---

## Attention Just Significantly Reduced In Value 

Your business can respond to opportunities and challenges even when you're not actively managing it. Mao analyzes your business situation and creates the appropriate response for current conditions. 

You'll be notified of price changes in your market or customer behavior shifts, potentially even after action has been taken to adjust and turn this into an opportunity 

This isn't about automating individual tasks. It is only tangentially about task automation. This is about Mao taking responsibility for entire business functions while you focus on strategy, creativity, and growth.




---

scheduling 
rescheduling 
canceling 
updating 
adding end date 


---

- Social media management 
- Content creation 
- Email management 
- Project management 
- Research 
- Marketing 



---

*This automation capability transforms Mao from a powerful productivity tool into a complete business operating system. The timer-triggered workflows enable genuine business autonomy where AI handles operations while humans focus on strategy, creativity, and growth. Through modular JSON configurations rather than hardcoded systems, every business can customize their autonomous operations to their specific needs and goals. And while the system is intended to be simple enough for anyone, it truly requires no learning curve to use because all you need to do is inform Mao, and all will be scheduled accurately for you*

---


Traditional automation triggers repetitive, predefined tasks. 
Mao's timer scheduled workflows trigger intelligence. 

Create a calendared workflow for an analysis, optimization, or strategic planning. 
You can even simply schedule the workflow for Mao to work autonomously. 

Mao doesn't just optimize your business; it optimizes its own performance through continuous self-analysis. The system tracks its own effectiveness, identifies improvement opportunities, and implements enhancements to its own capabilities.

This meta-learning creates exponential improvement curves where the business automation becomes more intelligent and effective over time. The AI assistant literally becomes more valuable and capable through experience with your specific business context.

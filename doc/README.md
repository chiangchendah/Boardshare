# Thesis Project

#### Table of Contents
- [Overview](#overview)
  - [Duration and Milestones](#duration-and-milestones)
  - [Design](#design)
- [Basic Requirements](#basic-requirements)
  - [Group Formation](#group-formation)
  - [Role Assignment](#role-assignment)
  - [Project Organization](#project-organization)
  - [Product Design](#product-design)
  - [Project Infrastructure](#project-infrastructure)
    - [Project Backlog](#project-backlog)
    - [Contribution Guide](#contribution-guide)
    - [Style Guide](#style-guide)
    - [Project Readme](#project-readme)
  - [Continuous Deployment](#continuous-deployment)
  - [Team Communication](#team-communication)
    - [New Code](#new-code)
    - [Speaking to each other](#speaking-to-each-other)
  - [Product Development](#product-development)
  - [Test Driven Development](#test-driven-development)
- [Group Presentations](#group-presentations)
- [Code Reviews](#code-reviews)
- [Thesis Project Groups](#thesis-project-groups)


## Overview

The Hack Reactor Thesis Project is your final and largest project as a student. It'll probably be the largest code base you share with potential employers. The project will last four weeks and will be the last step before you focus on hiring and job search.

You'll begin by working with your team to define a solid infrastructure to support your project. 

Use the lessons you learned during the greenfield-project and the legacy-project to help inform the decisions you make now.

Refer to [thesis-project](https://github.com/hackreactor/thesis-project) repo (referenced repeatedly below) that you'll need to refer to as a guide regarding how to successfully document and structure your project on github.

## Basic Requirements

#### Group Formation

- [ ] Get into your assigned groups (end of this document)

- Each member should spend five minutes (no talking) answering the following questions:
  - [ ] What are my 2 greatest technical strengths?
  - [ ] What are my 2 greatest technical challenges?
  - [ ] What are my personal goals for this project?

- Group Discussion
  - [ ] Discuss your individual answers with your group. Get to know each other.

### Role Assignment
As a group, decide which team members will fulfill each of the three core scrum roles.
  - [ ] [Product Owner][2]
  - [ ] [Scrum Master][3]
  - [ ] [Development Team][4]
  - [ ] Fill out the Team section in the readme with this info.

### Project Organization
Don't worry too much about choosing a name at this point. You'll likely refactor it several times anyway.
  - [ ] The Scrum Master must [Create a new GitHub Organization account](https://help.github.com/articles/creating-a-new-organization-account) for your team. This ensures that all members share equally in the glory of the project.
  - [ ] Add all your team-mates as members to the new org.
  - [ ] Create a repo within your new org for your project.

### Product Design
Create product vision by drafting a 'Project Summary'
  - [ ] Copy `_PRESS-RELEASE.md` into the root directory of your own project repo and complete the exercise described therein. Note that the actual instructions are hidden in a comment block. You'll need to view the raw file, not the rendered markdown version to see them.
  - [ ] Use github issues

### Project Infrastructure
In order to support your current team _and_ future contributers to your project, you'll need to document your project as you build it. It should be the case that, without any intervention or additional explanation from you, the next team of collaborators  (or yourself in six months) can dive in and figure out how to start hacking easily.

Document your project and codebase to the point that if you decide to push it to hacker-news, anyone with a solid understanding of JavaScript can (after reviewing your documentation and comments) start submitting pull requests. Plan on not having any face-to-face interaction with the next team of collaborators. The most effective and efficient way to accomplish this is to do it right from the very start. Don't wait till the last minute. That will never work.
  - [ ] Heavily comment all aspects of your code.

#### Project Backlog

Be sure keep your project backlog (using github issues) up to date. There should be clear
documentation of tasks completed (github provides this functionality automatically) and
next steps/features in your project backlog so that your collaborators can just dive right in.

You should use github issues to track both your project's backlog of tasks and
fixes and to provide a way to track future goals. You can use labels to
organize issues and milestones to group issues together and to visualize your
progress.

You may want to take advantage of a tool like [waffle.io](waffle.io) to manage github 
issues with a more powerful interface and can provide a kanban-board-like place to manage your 
project and workflow.

#### Contribution Guide

- [ ] Document your team's git workflow by copying `_CONTRIBUTING.md` into the root directory of your repo and editing it suite your needs. It follows a [forking workflow](https://www.atlassian.com/git/workflows#!workflow-forking).

The provided `_CONTRIBUTING.md` advocates for a `git rebase` based workflow
instead of a `git merge` based workflow. The advantage of a `rebase` based
workflow over `merge` is that a rebase, even one which fixes conflicts, does
not introduce a new commit into your history. If you use `merge` and there are
any conflicts, then you will get a new "merge commit" in your history. Over
time, you can accrue hundreds of merge commits which can make your history
significantly harder to read and introduce a much lower signal to noise ratio
in your history. `rebase` avoids these problems by changing existing commits
instead of creating a new one.

Because `rebase` changes commits, you will have to push with the `-f` or
`--force` flag to your branch after rebasing, as the history has changed in a
way that git cannot resolve. You should _never_ rebase or push with force to
the `master` branch of your repository, as that will invalidate everyone elses
clones and checkouts of the repository.

Though it advocates for a slightly different version of the rebase workflow, the article, [A romance of a single dimension: linear git history in practice](http://www.thumbtack.com/engineering/linear-git-history/) does an excelent job of justifying the practice. I strongly recomend reading it, even if you choose a different option.

##### `CONTRIBUTING.md` Workflow Diagram

![](http://i.imgur.com/p0e4tQK.png)

Remember, you're welcome to use which ever git workflow you want, `_CONTRIBUTING.md` is provided here as a suggestion (with the intention of you editing it). But whichever workflow you choose, you must document it well, you __must__ be consistent, and you should always have someone other than the person who wrote the code review it before it's merged into the central repository.

#### Style Guide
- [ ] Document your team's style guide by copying `_STYLE-GUIDE.md` into the root directory of your repo. `_STYLE-GUIDE.md` is provided as a template, you should edit it to reflect your agreed upon setup.
  - [AirBnB's](https://github.com/airbnb/javascript) and [The Google JS Style Guide](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml) are also excellent examples.

#### Project Readme
Your project readme is the very first thing that users will see when they view your github project. It's the portal that must link to the other content files in the root of your repo.
- [ ] Use `_README.md` as a template to create a thorough readme.
  - It must link to the documentation you've created (as described by the items above).

### Continuous Deployment
You must have a deployed website setup.
- [ ] Configure automatic deployment of your master branch using Azure

### Team Communication

#### New Code

Your team should communicate new ideas for features or report important bugs
through github issues or whatever tool you use to manage github issues, that
way everyone on your project can see what important things are happening and
there is always a repository of further work to be done.

To introduce new code into your project, your team should _always_ make pull
requests - never make commits and push directly to master. After you make a
pull request, at least one other member of your team should do a thorough code
review of the changes and you should have a good back and forth where the code
is refactored and improved before being merged in. This will guarantee a higher
degree of code quality and will prevent careless errors from being merged into
your application.
- [ ] Read this excellent (and brief) [article about pull requests](https://github.com/blog/1124-how-we-use-pull-requests-to-build-github)

With continuous integration, you will benefit even more from a
pull request based workflow because you will always know that you are never
merging breaking code into your master branch.

#### Speaking to each other

You may want to use a persistent chat service like [hipchat](5), [slack](6), or irc to
communicate as a team so that you can have efficient asynchronous
communication. This will make your team more accountable and efficient, so you
don't have to stop everyone else's work to discuss small issues or request code
review.

### Product Development
- [ ] Create a simple home page for your project.
  - If you're not sure where to start, checkout using GitHub pages. It's free, robust, and can easily be personalized to your own domain.
  - [ ] Make the landing page a salesman's dream (clear, flashy, cool design, etc)! Templates are your friends!
- [ ] Add a sweet "Made a Hack Reactor" Banner with this simple script:

  ```javascript
  $('body').append(
    '<a href="http://hackreactor.com"> \
    <img style="position: fixed; top: 0; right: 0; border: 0;" \
    src="http://i.imgur.com/x86kKmF.png" \
    alt="Built at Hack Reactor"> \
    </a>'
  );
  ```

### Test Driven Development

During your Thesis Project, you'll be using TDD.

Test driven development is not valuable because it catches errors, but because it changes the way you think about interfaces between modules. Writing tests before you write code influences how you think about the process. It provides a safety net for performing refactoring and it documents the expected behavior of the system.

Refer to the the solution branch of the [testify](/curriculum/testify) for some solid examples

You must implement _all_ of the following:
  - [ ] Include testing when defining your project scope
  - [ ] Continuous integration to run all tests on commit
    - You can use any CI system you like, TravisCI (easy) or Circle-CI (med) or Jenkins (hard) are all options
  - [ ] Make testing part of daily standups
  - [ ] Discuss testing during mentor check-ins

You must implement 2-3 of the following:
  - [ ] Unit testing on the client
  - [ ] Unit testing on the server side
  - [ ] Integration testing for your API and database
  - [ ] End-to-end testing for your main workflows
  - [ ] Code coverage reports for unit tests
  - [ ] Visual testing for your app’s look and feel

### Group Presentations

An important part of your thesis project is its presentation. You'll be debuting it at hiring day, and you'll speak eloquently about it in your interviews thereafter. AT several points throughout the thesis project, you'll present your project to your cohort and recieve specific feedback about how you can refine your delivery (see sylabus for specific dates).

Your group presentations must be (at most) 3min long. Each group will have 3min to present to the class, then there'll be a 3-5min of Q&A and feedback from the fascilitator.

In preparing for your presentations please make sure that you address the following specific issues/areas:
  - Be sure to introduce yourselves as a first order of business 
  - As a second order of business, explain the project to the audience at a high level before jumping into details 
  - Try to coordinate tightly between the person speaking, at any time, and the person driving tech, at any time, who should ideally not be the same person, at any time 
  - Do not start your presentation until technology is ready 
  - Make sure all text on the screen that you require the audience to read is large enough to be read 
  - Do not require the audience to read too much text on the screen 
  - If you are pointing at the screen to make a point, ensure you point at the big screen not the small screen 
  - Make sure you look towards the audience while speaking. Don't throw your voice at the screen.  
  - Do not have off-mic conversations with your team while you are presenting. 
  - Everything that you put into your presentation should make the case for why you or one of your teammates should be hired as a software engineer. If you have a lot of time left, there are a lot of things you could be saying about why you are awesome. 
  - Speaking of time management, your presentation must run precisely 3 minutes long.

### Code Reviews 
- __Start in late week 10__
- Who gets one?: Student projects receive code reviews from Hack Reactor mentors. Hosted projects receive them from mentor engineers at the host company.
- Format: Code reviews are 1-hour and have a dedicated Mentor and room. All team members are expected to join and are expected to provide the mentor with a focused set of questions or features/classess to examine and take feedback on in that time. Please do not expect to review 100% of your codebase.
- [ ] Locate you calendar invite from the Instruction Team in your email
  -  If you have difficulty finding it, reference this [schedule](https://docs.google.com/spreadsheets/d/1XXEWnBChT3oWxOWZX6tICwvwqkiE1wZbQX8dnxxIRig/edit#gid=220699446)
- [ ] Maximize effectiveness by eliminating low level feedback by adhering to these guidlines for ["every code review ever"](https://github.com/hackreactor/curriculum/wiki/Projects:-Every-Code-Review-Ever) 
- [ ] Implement Code Review feedback by the end of thesis project completion.
- Extra Credit: Review [Getting and Giving Good Code Reviews](https://github.com/hackreactor/curriculum/wiki/Projects:-getting-and-giving-good-code-reviews)

<!-- 
### Project Summaries 

Fill out a project summary for your group [here](https://drive.google.com/drive/#folders/0B1sN34rdEL70MXZSUlRXTlVXaUE) 
-->

<!-- LINKS -->

[1]:http://en.wikipedia.org/wiki/Scrum_(software_development)#Roles
[2]:http://en.wikipedia.org/wiki/Scrum_(software_development)#Product_Owner
[3]:http://en.wikipedia.org/wiki/Scrum_(software_development)#Scrum_Master
[4]:http://en.wikipedia.org/wiki/Scrum_(software_development)#Development_Team

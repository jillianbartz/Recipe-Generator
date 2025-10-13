<p align="center">
  <img width="783" height="215" alt="Screenshot 2025-10-11 at 2 17 08 PM" src="https://github.com/user-attachments/assets/9e7e4f80-a771-4e62-8846-ba775aaa9d8d" />
</p>

# Introduction

### ${\color{lightblue}Ever \space get \space tired \space of \space scrolling \space endlessley \space to \space access \space your \space online \space recipe? \space Sweet \space Recipes \space is \space here \space to \space help!}$

Sweet Recipes was created through a research project that tested, critiqued, and implemented prototypes from various AI tools. The goal was to assess the ability for AI to create full-stack prototypes, with an emphasis on front-end design and development.

_View the full presentation and analysis [here](https://docs.google.com/presentation/d/1EUMniW7OUN0PlMIKZwhc7pMfOlXoeWDjM5A4x9ZwOlc/edit?usp=sharing)._

# AI Tooling

### V0

${\color{gold} ☆ Best \space Code \space System \space / No \space clutter}$

| Front-end                             | Functionality                                                                             |
| ------------------------------------- | ----------------------------------------------------------------------------------------- |
| $${\color{red}gradient}$$             | $${\color{red}did \space not \space properly \space display \space loading \space page}$$ |
| $${\color{red}emojis}$$               | $${\color{green}error \space handling(toast)}$$                                           |
| $${\color{green}mobile \space view}$$ | $${\color{green}understood \space feedback}$$                                             |
| $${\color{green}dark \space mode}$$   | $${\color{green}simple \space non\text{-}cluttered \space code}$$                         |

### Bolt

| Front-end                                      | Functionality                                                             |
| ---------------------------------------------- | ------------------------------------------------------------------------- |
| $${\color{red}gradients}$$                     | $${\color{green}displayed \space loading \space screen \space properly}$$ |
| $${\color{red}emojis}$$                        | $${\color{green}error \space handling}$$                                  |
| $${\color{green}no \space UI \space library}$$ | $${\color{green}understood \space feedback}$$                             |
| $${\color{green}animations}$$                  | $${\color{green}functional \space and \space responsive}$$                |

### Lovable

${\color{gold} ☆ Most \space Unique \space Front-end \space }$

| Front-end                                                               | Functionality                                                                              |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| $${\color{red}gradients \space and \space emojis}$$                     | $${\color{red}had \space to \space prompt \space static \space test \space data}$$         |
| $${\color{green}background \space image}$$                              | $${\color{red}changed \space components \space not \space asked \space to \space adjust}$$ |
| $${\color{green}animations \space and \space page \space transitions}$$ | $${\color{red}includes \space UI \space library \space code}$$                             |
| $${\color{green}mobile \space view}$$                                   | $${\color{red}used \space Radix \space UI \space library}$$                                |
| $${\color{green}dark \space mode}$$                                     | $${\color{green}error \space handling(toast)}$$                                            |
| $${\color{green}pop \space ups}$$                                       |                                                                                            |

### Figma

${\color{gold} ☆ Interactiveness }$

| Front-end                                           | Functionality                                                                     |
| --------------------------------------------------- | --------------------------------------------------------------------------------- |
| $${\color{red}gradients \space and \space emojis}$$ | $${\color{red}includes \space UI \space library \space code}$$                    |
| $${\color{green}animations}$$                       | $${\color{red}used \space Radix \space UI \space library}$$                       |
| $${\color{green}mobile \space view}$$               | $${\color{green}added \space interactivity \space to \space recipe \space page}$$ |
| $${\color{green}dark \space mode}$$                 | $${\color{green}error \space handling(toast)}$$                                   |

# Integrating Prototype Into Project

- Prototype chosen: Lovable, due to it's unique and smooth UI.
- Personally implemented APIs, so did not include the prototype's example code.
- Did **not** export the code from the prototype, instead just picked out the front-end pages to implement.
- Reduced project file size by eliminating use of UI library from prototype code

# Setup Instructions

_If you'd like to try Sweet Recipes out, follow instructions below_

- Install all files
- Create a .env file in the root directory, and add personal Gemini API key in format below:

```
GEMINI_API_KEY=your_gemini_key_here
DATABASE_URL=your_database_url_here
```

- `npm install`
- `npm run dev`
- Open the localhost page and enjoy, Happy Cooking!

# Project Notes

APIs

- Gemini 2.5 Pro
- puppeteer PDF Exporter

Languages

- TypeScript
- Node.js
- Tailwind + CSS

Dependencies

- npm

#

Personal Note:
Welcome to my project, Sweet Recipes! My motivation for creating this website is to help users create a neat, formatted, and quick display of their recipe. With a personal interest in front-end and full-stack development, I wanted to explore different AI tools to determine if any of them would be of assistance for development. I decided to use Lovable's provided prototype, adding my personal twist and new incorporations after. In addition to testing prototyping tools, I wanted to also test the integration of an AI API into a project, which has had mixed results due to it's speed of parsing, but in general I am still impressed by it's accuracy.

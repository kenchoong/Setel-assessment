## Introduction

This project is for this assesment: 2018.02.27-fullstack-engineer-practical in GoogleSlide.

This project contain 2 parts. Frontend and CDK, both inside the relevant folder in the repo, here is all the stack I used.

- **Frontend:** Nextjs
- **Backend:** Nestjs with aws Lambda
- **Database:** DynamoDB
- **Deploy:** aws CDK
- **Aws service I used**: DynamoDB, Lambda, Api Gateway, Amplify

## TLDR

In order to save your time, I have hosted this project, so you can take a look.

**Website:** Go to the website I provide (Dont want to state here to avoid abuse.)

## How it works?

In frontend pretty much self-explanatory. Which includes all this pages:

- `/` : Demonstrate product to make order
- `/order`: Display all the order you display before
- `/order/create` : create the order
- `/order/:orderId`: check status of 1 specific order, and `cancel` an order with a button
- `/payment`: make payment do all 6 step below for backend

For backend, below is how I design the flow for the requirement mention at Thrid slide(General Scenario)

<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
  "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1144" height="1414" viewBox="-32 -32 1144 1414" id="ccdiagram"><filter id="grayscale"><feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"></feColorMatrix></filter><defs><style type="text/css">@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700|Inconsolata:400');</style></defs><g><g style="pointer-events: none;"><g><pattern id="gridPatternMinor" x="0" y="0" width="90" height="90" patternUnits="userSpaceOnUse"><path d="M -45 45 L 135 45" stroke="#eee" stroke-width="1"></path><path d="M 45 -45 L 45 135" stroke="#eee" stroke-width="1"></path></pattern><polygon points="0 0, 1080 0, 1080 1350, 0 1350" fill="url(#gridPatternMinor)"></polygon></g></g><g pointer-events="auto"></g><g style="pointer-events: none;"><g><pattern id="gridPatternMajor" x="0" y="0" width="90" height="90" patternUnits="userSpaceOnUse"><path d="M 0 0 L 90 0 90 90 0 90 z" stroke="#54626f" stroke-width="1" fill="none"></path></pattern><polygon points="0 0, 1080 0, 1080 1350, 0 1350" fill="url(#gridPatternMajor)"></polygon></g></g><g pointer-events="auto"></g><g pointer-events="auto"></g><g></g><g pointer-events="auto"></g><g></g><g pointer-events="auto"></g><g pointer-events="auto"></g><g pointer-events="none"></g><g pointer-events="auto"><g id="959c42cc-f557-4b5a-b4b8-57c0ab4bcfde-9ddb4a66-6a40-42b9-9c7c-d566eb9fd303"><g cursor="cell"><line x1="630" y1="765" x2="788" y2="765" stroke="red" stroke-width="8" opacity="0"></line><line x1="630" y1="765" x2="788" y2="765" stroke="#000000" stroke-width="2" stroke-linecap="round"></line></g></g><g id="280a2fc7-df59-4e2a-913a-11d187c63025-959c42cc-f557-4b5a-b4b8-57c0ab4bcfde"><g cursor="cell"><line x1="180" y1="765" x2="527" y2="765" stroke="red" stroke-width="8" opacity="0"></line><line x1="180" y1="765" x2="527" y2="765" stroke="#000000" stroke-width="2" stroke-linecap="round"></line><polygon points="540 765, 516 754, 522 765, 516 776, 540 765" stroke-linejoin="round" fill="#000000" stroke="#000000" stroke-width="1"></polygon></g></g><g id="76e33b36-1c4f-4e0f-ad09-c55a54534f07-74fc5344-a6d3-4fa8-a733-4172478e2d77"><g cursor="cell"><line x1="585" y1="1170" x2="585" y2="1171" stroke="red" stroke-width="8" opacity="0"></line><line x1="585" y1="1170" x2="585" y2="1171" stroke="#000000" stroke-width="2" stroke-linecap="round"></line><polygon points="585 1184, 596 1160, 585 1167, 574 1160, 585 1184" stroke-linejoin="round" fill="#000000" stroke="#000000" stroke-width="1"></polygon></g></g><g id="0fd706d4-0210-4f27-bb32-862a7eea4c7c-959c42cc-f557-4b5a-b4b8-57c0ab4bcfde"><g cursor="cell"><line x1="990" y1="765" x2="644" y2="765" stroke="red" stroke-width="8" opacity="0"></line><line x1="990" y1="765" x2="644" y2="765" stroke="#000000" stroke-width="2" stroke-linecap="round"></line><polygon points="630 765, 654 776, 648 765, 654 754, 630 765" stroke-linejoin="round" fill="#000000" stroke="#000000" stroke-width="1"></polygon></g></g><g id="959c42cc-f557-4b5a-b4b8-57c0ab4bcfde-76e33b36-1c4f-4e0f-ad09-c55a54534f07"><g cursor="cell"><line x1="585" y1="810" x2="585" y2="1170" stroke="red" stroke-width="8" opacity="0"></line><line x1="585" y1="810" x2="585" y2="1170" stroke="#000000" stroke-width="2" stroke-linecap="round"></line></g></g><g id="74fc5344-a6d3-4fa8-a733-4172478e2d77-cb806cd8-9c48-468c-a7d8-4686e2e0c6c3"><g cursor="cell"><line x1="585" y1="1215" x2="585" y2="833" stroke="red" stroke-width="8" opacity="0"></line><line x1="585" y1="1215" x2="585" y2="833" stroke="#000000" stroke-width="2" stroke-linecap="round"></line></g></g><g id="959c42cc-f557-4b5a-b4b8-57c0ab4bcfde-280a2fc7-df59-4e2a-913a-11d187c63025"><g cursor="cell"><line x1="540" y1="765" x2="194" y2="765" stroke="red" stroke-width="8" opacity="0"></line><line x1="540" y1="765" x2="194" y2="765" stroke="#000000" stroke-width="2" stroke-linecap="round"></line><polygon points="180 765, 204 776, 198 765, 204 754, 180 765" stroke-linejoin="round" fill="#000000" stroke="#000000" stroke-width="1"></polygon></g></g><g id="9ddb4a66-6a40-42b9-9c7c-d566eb9fd303-0fd706d4-0210-4f27-bb32-862a7eea4c7c"><g cursor="cell"><line x1="788" y1="765" x2="977" y2="765" stroke="red" stroke-width="8" opacity="0"></line><line x1="788" y1="765" x2="977" y2="765" stroke="#000000" stroke-width="2" stroke-linecap="round"></line><polygon points="990 765, 966 754, 972 765, 966 776, 990 765" stroke-linejoin="round" fill="#000000" stroke="#000000" stroke-width="1"></polygon></g></g><g id="9fab8923-adc6-4a42-8410-3b851e257a36-959c42cc-f557-4b5a-b4b8-57c0ab4bcfde"><g cursor="cell"><line x1="630" y1="765" x2="630" y2="765" stroke="red" stroke-width="8" opacity="0"></line><line x1="630" y1="765" x2="630" y2="765" stroke="#000000" stroke-width="2" stroke-linecap="round"></line><polygon points="630 765, 630 765, 630 765, 630 765, 630 765" stroke-linejoin="round" fill="#000000" stroke="#000000" stroke-width="1"></polygon></g></g><g id="ea3aa979-7223-42fb-852b-07b789013e44-280a2fc7-df59-4e2a-913a-11d187c63025"><g cursor="cell"><line x1="135" y1="554" x2="135" y2="720" stroke="red" stroke-width="8" opacity="0"></line><line x1="135" y1="554" x2="135" y2="720" stroke="#000000" stroke-width="2" stroke-linecap="round"></line><polygon points="135 540, 124 564, 135 558, 146 564, 135 540" stroke-linejoin="round" fill="#000000" stroke="#000000" stroke-width="1"></polygon></g></g><g id="cb806cd8-9c48-468c-a7d8-4686e2e0c6c3-31723622-7dd6-4951-8c0e-a64752f84d24"><g cursor="cell"><line x1="585" y1="833" x2="585" y2="833" stroke="red" stroke-width="8" opacity="0"></line><line x1="585" y1="833" x2="585" y2="833" stroke="#000000" stroke-width="2" stroke-linecap="round"></line></g></g><g id="31723622-7dd6-4951-8c0e-a64752f84d24-959c42cc-f557-4b5a-b4b8-57c0ab4bcfde"><g cursor="cell"><line x1="585" y1="833" x2="585" y2="824" stroke="red" stroke-width="8" opacity="0"></line><line x1="585" y1="833" x2="585" y2="824" stroke="#000000" stroke-width="2" stroke-linecap="round"></line><polygon points="585 810, 574 834, 585 828, 596 834, 585 810" stroke-linejoin="round" fill="#000000" stroke="#000000" stroke-width="1"></polygon></g></g><g id="0fd706d4-0210-4f27-bb32-862a7eea4c7c-9fab8923-adc6-4a42-8410-3b851e257a36"><g cursor="cell"><line x1="990" y1="765" x2="630" y2="765" stroke="red" stroke-width="8" opacity="0"></line><line x1="990" y1="765" x2="630" y2="765" stroke="#000000" stroke-width="2" stroke-linecap="round"></line></g></g></g><g pointer-events="auto"><g opacity="1"><g id="ea3aa979-7223-42fb-852b-07b789013e44" transform="translate(0 0)"><svg x="90" y="450" height="90" id="svg21" width="90" version="1.1"><defs id="defs4"></defs><g id="Reference" fill-opacity="1" transform="scale(1.2)"><path id="Blue_Light_BG" d="M0 0h75v75H0z" fill="#3b48cc" data-name="Blue Light BG"></path><g id="Product_Icon" fill="#ffffff" data-name="Product Icon"><path class="cls-2" id="path9" d="M50.25 40.48l-6.61 6.6a16.23 16.23 0 0 0 3.42-1.39 2.58 2.58 0 0 1 1.19 1.8c0 1.83-3.88 3.82-9.64 4.63a42.23 42.23 0 0 1-5.36.38h-1c-8.08-.19-14-2.74-14-5a2.58 2.58 0 0 1 1.19-1.8c3.14 1.75 8.23 2.79 13.81 2.79h.11l.56-2h-.67c-5.5 0-10.6-1.09-13.31-2.81-1.08-.71-1.68-1.48-1.69-2.15V36.9c3.06 2.34 9.16 3.56 15 3.56.79 0 1.58 0 2.35-.07l.57-2c-1 .07-1.93.1-2.92.1-8.58 0-15-2.63-15-5a2.58 2.58 0 0 1 1.19-1.8c2.76 1.55 7 2.52 11.81 2.74l.05-2c-4.73-.23-9-1.25-11.36-2.76-1.07-.69-1.67-1.47-1.69-2.15V22.9c3.06 2.34 9.16 3.56 15 3.56h.22l1.06-2h-1.28c-8.58 0-15-2.63-15-5s6.42-5 15-5a36 36 0 0 1 8.58 1h5.49c-3-1.83-8.18-3-14.07-3-8.24 0-17 2.44-17 7v8.05a4.06 4.06 0 0 0 1.51 2.95 4.07 4.07 0 0 0-1.51 3v8a4.06 4.06 0 0 0 1.51 3 4.07 4.07 0 0 0-1.51 3v8a1.25 1.25 0 0 0 0 .21c.27 4.39 8.87 6.75 17 6.75s16.73-2.36 17-6.77a.75.75 0 0 0 0-.21v-8a4 4 0 0 0-1.51-3 4.06 4.06 0 0 0 1.51-3zm-2 15c0 2.36-6.42 5-15 5s-15-2.61-15-5v-4.6c3.06 2.32 9.16 3.54 15 3.54s11.94-1.22 15-3.54z" fill="#ffffff" fill-opacity="1"></path><circle class="cls-2" id="circle11" cx="21.25" cy="27.52" fill="#ffffff" fill-opacity="1" r="1.25"></circle><circle class="cls-2" id="circle13" cx="21.25" cy="41.52" fill="#ffffff" fill-opacity="1" r="1.25"></circle><circle class="cls-2" id="circle15" cx="21.25" cy="55.52" fill="#ffffff" fill-opacity="1" r="1.25"></circle><path class="cls-2" id="path17" d="M35.75 51.48a1 1 0 0 1-.5-.14 1 1 0 0 1-.46-1.15l5.62-18.71h-5.66a1 1 0 0 1-.89-1.48l6-12a1 1 0 0 1 .89-.55h13a1 1 0 0 1 1 1.31l-2.56 7.69h5.61a1 1 0 0 1 .72 1.69l-22 23a1 1 0 0 1-.77.34zm.62-22h5.38a1 1 0 0 1 .8.4 1 1 0 0 1 .16.88l-4.81 16 17.51-18.3h-4.66a1 1 0 0 1-1-1.32l2.56-7.68h-11z" fill="#ffffff" fill-opacity="1"></path></g></g></svg></g></g><g opacity="1"><g id="280a2fc7-df59-4e2a-913a-11d187c63025" transform="translate(0 0)"><svg x="90" y="720" height="90" id="svg15" width="90" version="1.1"><defs id="defs4"></defs><g id="Reference" fill-opacity="1" transform="scale(1.2)"><path id="Orange_Light_BG" d="M0 0h75v75H0z" fill="#d86613" data-name="Orange Light BG"></path><g id="Product_Icon" fill="#ffffff" data-name="Product Icon"><path class="cls-2" id="path9" d="M60.5 62.5H48.18a1 1 0 0 1-.9-.57L29.86 25.5h-7.37a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h15.4a1 1 0 0 1 .9.57L56.13 49.5h4.37a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1zm-11.69-2H59.5v-9h-4a1 1 0 0 1-.9-.57L37.26 14.5H23.5v9h7a1 1 0 0 1 .9.57z" fill="#ffffff" fill-opacity="1"></path><path class="cls-2" id="path11" d="M27.48 62.5h-13a1 1 0 0 1-.85-.47 1 1 0 0 1-.05-1l13.6-28.41a1 1 0 0 1 .9-.57 1 1 0 0 1 .9.56L35.49 46a1 1 0 0 1 0 .87l-7.1 15a1 1 0 0 1-.91.63zm-11.4-2h10.77l6.63-14-5.39-11.15z" fill="#ffffff" fill-opacity="1"></path></g></g></svg></g></g><g opacity="1"><g id="959c42cc-f557-4b5a-b4b8-57c0ab4bcfde" transform="translate(0 0)"><svg x="540" y="720" height="90" id="svg25" width="90" version="1.1"><defs id="defs4"></defs><g id="Reference" fill-opacity="1" transform="scale(1.2)"><path id="Purple_Light_BG" d="M0 0h75v75H0z" fill="#693cc5" data-name="Purple Light BG"></path><g id="Product_Icon" fill="#ffffff" data-name="Product Icon"><path class="cls-2" id="path9" d="M48.51 61.5a1 1 0 0 1-.59-.19 1 1 0 0 1-.42-.81v-46a1 1 0 0 1 .48-.85 1 1 0 0 1 1-.05l13 6.35a1 1 0 0 1 .56.89v35.34a1 1 0 0 1-.69 1l-13 4.32a1.19 1.19 0 0 1-.34 0zm1-45.39v43l11-3.65v-34z" fill="#ffffff" fill-opacity="1"></path><path class="cls-2" id="path11" d="M26.5 61.5a1.19 1.19 0 0 1-.32 0l-13-4.32a1 1 0 0 1-.68-1V20.84a1 1 0 0 1 .56-.89l13-6.35a1 1 0 0 1 1 .05 1 1 0 0 1 .47.85v46a1 1 0 0 1-.42.81.94.94 0 0 1-.61.19zm-12-6l11 3.65v-43l-11 5.37z" fill="#ffffff" fill-opacity="1"></path><path class="cls-2" id="path13" d="M47.5 27.5h-3v-2h3zm-6 0h-3v-2h3zm-6 0h-3v-2h3zm-6 0h-3v-2h3z" fill="#ffffff" fill-opacity="1"></path><path class="cls-2" id="path15" d="M47.5 49.5h-3v-2h3zm-6 0h-3v-2h3zm-6 0h-3v-2h3zm-6 0h-3v-2h3z" fill="#ffffff" fill-opacity="1"></path><path class="cls-2" id="path17" d="M33.11 40.94l-3.76-3.21a1 1 0 0 1 0-1.52L33.1 33l1.3 1.52L31.54 37l2.86 2.45z" fill="#ffffff" fill-opacity="1"></path><path class="cls-2" id="path19" d="M41.9 40.94l-1.3-1.52L43.46 37l-2.87-2.44 1.3-1.56 3.76 3.2a1 1 0 0 1 0 1.52z" fill="#ffffff" fill-opacity="1"></path><path class="cls-2" id="rect21" d="M31.29 36.5H43.7v2H31.29z" fill="#ffffff" fill-opacity="1" transform="rotate(-71.32 37.488 37.496)"></path></g></g></svg></g></g><g opacity="1"><g id="0fd706d4-0210-4f27-bb32-862a7eea4c7c" transform="translate(0 0)"><svg x="990" y="720" height="90" id="svg15" width="90" version="1.1"><defs id="defs4"></defs><g id="Reference" fill-opacity="1" transform="scale(1.2)"><path id="Orange_Light_BG" d="M0 0h75v75H0z" fill="#d86613" data-name="Orange Light BG"></path><g id="Product_Icon" fill="#ffffff" data-name="Product Icon"><path class="cls-2" id="path9" d="M60.5 62.5H48.18a1 1 0 0 1-.9-.57L29.86 25.5h-7.37a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1h15.4a1 1 0 0 1 .9.57L56.13 49.5h4.37a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1zm-11.69-2H59.5v-9h-4a1 1 0 0 1-.9-.57L37.26 14.5H23.5v9h7a1 1 0 0 1 .9.57z" fill="#ffffff" fill-opacity="1"></path><path class="cls-2" id="path11" d="M27.48 62.5h-13a1 1 0 0 1-.85-.47 1 1 0 0 1-.05-1l13.6-28.41a1 1 0 0 1 .9-.57 1 1 0 0 1 .9.56L35.49 46a1 1 0 0 1 0 .87l-7.1 15a1 1 0 0 1-.91.63zm-11.4-2h10.77l6.63-14-5.39-11.15z" fill="#ffffff" fill-opacity="1"></path></g></g></svg></g></g><g opacity="1"><g id="027046d5-cf28-4086-b524-b9506cea9dc9" transform="translate(0 0)"><svg x="450" y="1170" height="90" id="svg13" width="90" version="1.1"><defs id="defs4"></defs><g id="Working" transform="matrix(1.9149 0 0 1.9149 -2.872 -2.852)"><circle id="path819" cx="25.03" cy="13.644" fill="#232f3e" fill-opacity="1" opacity=".05" r="10.787" stroke="none" stroke-opacity="1" stroke-width=".522"></circle><path class="cls-1" id="path8-6" d="M47.5 48.44h-45a1 1 0 0 1-1-1v-3a22.73 22.73 0 0 1 17.36-22.1 1.06 1.06 0 0 1 .72.09 11.29 11.29 0 0 0 10.82 0 1 1 0 0 1 .71-.09A22.73 22.73 0 0 1 48.5 44.45v3a1 1 0 0 1-1 .99z" fill="#232f3e" fill-opacity="1" opacity=".05" stroke-width="1"></path><path class="cls-1" id="path8" d="M47.5 48.44h-45a1 1 0 0 1-1-1v-3a22.73 22.73 0 0 1 17.36-22.1 1.06 1.06 0 0 1 .72.09 11.29 11.29 0 0 0 10.82 0 1 1 0 0 1 .71-.09A22.73 22.73 0 0 1 48.5 44.45v3a1 1 0 0 1-1 .99zm-44-2h43v-2A20.71 20.71 0 0 0 31 24.39a13.51 13.51 0 0 1-6 1.43 13.21 13.21 0 0 1-6-1.43A20.72 20.72 0 0 0 3.5 44.45z" fill="#232f3e" fill-opacity="1"></path><path class="cls-1" id="path10" d="M25 25.75a12.18 12.18 0 0 1-5.9-1.5 12.13 12.13 0 1 1 18.06-10.58 12 12 0 0 1-6.32 10.58 12.38 12.38 0 0 1-5.84 1.5zm0-22.19a10.08 10.08 0 0 0-5 18.94 10.33 10.33 0 0 0 9.85 0A10.08 10.08 0 0 0 25 3.56z" fill="#232f3e" fill-opacity="1"></path></g></svg></g></g></g><g pointer-events="auto"></g><g pointer-events="auto"><g opacity="1"><g id="74fc5344-a6d3-4fa8-a733-4172478e2d77" transform="translate(0 0)"><svg x="585" y="1215" overflow="visible"><g transform="scale(1.2074767078498865) "><circle cx="0" cy="0" fill="transparent" r="25"></circle><svg width="50" height="50" x="-25" y="-25"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><g id="Working"><path d="M45.48 34.91h-41a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h41a3 3 0 0 1 3 3v26.89a3 3 0 0 1-3 3.02zM4.52 4a1 1 0 0 0-1 1v26.89a1 1 0 0 0 1 1h41a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zM45 48H5a3.53 3.53 0 0 1-3.5-3.49v-4.33A3.53 3.53 0 0 1 5 36.66h40a3.53 3.53 0 0 1 3.52 3.52v4.33A3.53 3.53 0 0 1 45 48zM5 38.66a1.52 1.52 0 0 0-1.5 1.52v4.33A1.52 1.52 0 0 0 5 46h40a1.52 1.52 0 0 0 1.52-1.52v-4.3A1.52 1.52 0 0 0 45 38.66z" style="fill:#232f3e"></path><path d="M43.75 31.16H6.25a1 1 0 0 1-1-1V6.72a1 1 0 0 1 1-1h37.5a1 1 0 0 1 1 1v23.44a1 1 0 0 1-1 1zm-36.5-2h35.5V7.72H7.25z" style="fill:#232f3e"></path><rect x="31.5" y="40.41" width="13.25" height="3.88" rx="1" style="fill:#232f3e"></rect></g></svg></svg></g></svg></g></g></g><g pointer-events="auto"><g opacity="1"><g id="269a8b53-df16-434f-8667-6cb3bf578808"><svg x="68" y="810" overflow="visible"><text stroke="#ffffff" stroke-width="4" font-family="Open Sans" y="23.96" font-size="14pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">OrderService</tspan><tspan x="8" dy="1.1em">Lambda</tspan></text><text font-family="Open Sans" y="23.96" font-size="14pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">OrderService</tspan><tspan x="8" dy="1.1em">Lambda</tspan></text></svg></g></g><g opacity="1"><g id="d2e81231-d9a6-4481-9a72-e02d2700b0c2"><svg x="473" y="810" overflow="visible"><text stroke="#ffffff" stroke-width="4" font-family="Open Sans" y="36.5" font-size="25pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">API Gateway</tspan></text><text font-family="Open Sans" y="36.5" font-size="25pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">API Gateway</tspan></text></svg></g></g><g opacity="1"><g id="4b861c29-983d-44d4-8aeb-2bf5ba77d80c"><svg x="990" y="810" overflow="visible"><text stroke="#ffffff" stroke-width="4" font-family="Open Sans" y="21.68" font-size="12pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">PaymentService</tspan><tspan x="8" dy="1.1em">Lambda</tspan></text><text font-family="Open Sans" y="21.68" font-size="12pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">PaymentService</tspan><tspan x="8" dy="1.1em">Lambda</tspan></text></svg></g></g><g opacity="1"><g id="59142dd0-02bd-4254-9480-855ae8f4faf8" transform="translate(0 0)"><svg x="450" y="1013" overflow="visible"><text stroke="#ffffff" stroke-width="4" font-family="Open Sans" y="36.5" font-size="25pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">Step 1</tspan></text><text font-family="Open Sans" y="36.5" font-size="25pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">Step 1</tspan></text></svg></g></g><g opacity="1"><g id="7a1098e6-8455-4b33-9229-a98fdd23ecee" transform="translate(0 0)"><svg x="293" y="788" overflow="visible"><text stroke="#ffffff" stroke-width="4" font-family="Open Sans" y="36.5" font-size="25pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">Step 2</tspan></text><text font-family="Open Sans" y="36.5" font-size="25pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">Step 2</tspan></text></svg></g></g><g opacity="1"><g id="fbf9b9c6-dabe-44f2-98fb-2ff4cf9ddb13" transform="translate(0 0)"><svg x="293" y="698" overflow="visible"><text stroke="#ffffff" stroke-width="4" font-family="Open Sans" y="36.5" font-size="25pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">Step 3</tspan></text><text font-family="Open Sans" y="36.5" font-size="25pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">Step 3</tspan></text></svg></g></g><g opacity="1"><g id="9d7ae6da-d0e6-4741-a817-2d861a8cbde0" transform="translate(0 0)"><svg x="788" y="698" overflow="visible"><text stroke="#ffffff" stroke-width="4" font-family="Open Sans" y="36.5" font-size="25pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">Step 4</tspan></text><text font-family="Open Sans" y="36.5" font-size="25pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">Step 4</tspan></text></svg></g></g><g opacity="1"><g id="fa1820ec-2537-49b7-98e1-222a926feb8b" transform="translate(0 0)"><svg x="810" y="788" overflow="visible"><text stroke="#ffffff" stroke-width="4" font-family="Open Sans" y="36.5" font-size="25pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">Step 5</tspan></text><text font-family="Open Sans" y="36.5" font-size="25pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">Step 5</tspan></text></svg></g></g><g opacity="1"><g id="c0e8b06c-6242-40d9-aa64-e633ff587dc4" transform="translate(0 0)"><svg x="180" y="473" overflow="visible"><text stroke="#ffffff" stroke-width="4" font-family="Open Sans" y="30.799999999999997" font-size="20pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">DynamoDb</tspan></text><text font-family="Open Sans" y="30.799999999999997" font-size="20pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">DynamoDb</tspan></text></svg></g></g><g opacity="1"><g id="333ea239-539c-44b1-bdd7-9dc2160f3675" transform="translate(0 0)"><svg x="608" y="1013" overflow="visible"><text stroke="#ffffff" stroke-width="4" font-family="Open Sans" y="36.5" font-size="25pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">Step 6</tspan></text><text font-family="Open Sans" y="36.5" font-size="25pt" fill="#4251c5" font-weight="bold" transform="" xml:space="preserve"><tspan x="8" dy="0">Step 6</tspan></text></svg></g></g></g><g pointer-events="auto"><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></g></g></svg>

- **Step 1:**: User call to API gateway, `POST /orders` to create an order
- **Step 2:**: APIgateway trigger to OrderServiceLambda
- **Step 3:**: OrderServiceLambda done created order and store in Db, called to `POST /payment` method
- **Step 4:**: APIgateway trigger PaymentServiceLambda to process payment
- **Step 5:**: PaymentServiceLambda will do the following:
  1. produce the "payment status" to either Confirmed or Declined.
  2. I use RXjs to loop through and array with status like `[Initializing, Processing, Confirmed/Declined]`
  3. Every 3 second will call `PUT /orders/orderId` to update the value from the array to update the Payment status in `OrderService`
  4. You can see the code here:
- **Step 6:**: In client, user will long polling using RXjs,

  1.  every 5 seconds will client will call to `GET /orders/status/:userId/:orderId`
  2.  this will return the payment status wheter is `Initializing, Processing, Confirmed/Declined`
  3.  Depends on each `status`, the client will response accordingly
  4.  Until if `status` is confirmed, then will wait for 3 seconds, then tell user is `Delivered`, and update in DB as well.

## Step by step guide how to deploy this project

- #### Deploy to aws using CDK

  Prerequisite: CDK CLI, have your aws account configured in your system

  cd to `cdk` folder to do all this below. A bit work to do, cause I havent do the CI stuff

  1. Install all the stuff, and build for deployment, below all start from `/` root folder

  ```
   // in root, for CDK stuff
   yarn

   // For Lambda Layer
   $ cd lambda/layer/nodejs
   $ yarn
   $ yarn build

   // For OrderService
   $ cd lambda/order
   $ yarn
   $ yarn build

   // For PaymentService
   $ cd lambda/payment
   $ yarn
   $ yarn build
  ```

2. Insert the AWS account you want to deploy to [here](https://github.com/kenchoong/Setel-assessment/blob/1a1aab238684d14c6acd04271a5e3a47c01b070c/cdk/bin/cdk.ts#L9), have to same account with the account you `aws configure` early on. In case you dont want to specific an account, just make the whole file like this (remove the `demoStack` from `CdkStack`):

   ```
   code bin/cdk.ts


   port "source-map-support/register";
   import * as cdk from "@aws-cdk/core";
   import { CdkStack } from "../lib/cdk-stack";

   const app = new cdk.App();

   new CdkStack(app, "CdkStack");
   ```

3. Get the CloudFormation (Part of assessment)

   ```
    $ cdk synth
    // the cloudformation will be in cdk.out folder
   ```

4. Deploy to cloud

   ```
   // if didnt have account specified(as mention in step 2)
   $ cdk deploy

   // if have account specific, then use a profile from that account.
   $ cdk deploy --profile MyIAMprofileHere
   ```

Done. After a while, all the stack will be deployed, and output an URL. Then we move to Fronted end.

- #### Deploy Frontend

  1. Copy the URL after the `cdk deploy` and

  ```
  cd frontend
  code -r .env.production

  // paste the URL from Backend step 3 to make file become like this
  NEXT_PUBLIC_API_URL="YOUR_API_URL_HERE"
  ```

  Done. Thats all you need to setup for frontend. Then we can deploy it to Vercel or Amplify. I use Amplify, can [read documentation here](https://docs.amplify.aws/guides/hosting/nextjs/q/platform/js/#getting-started)

### Thats it. Thanks for reading. If anything, just let me know in issue, I want to learn from you.

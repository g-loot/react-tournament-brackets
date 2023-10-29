<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/g-loot/react-tournament-brackets">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a> -->

  <h3 align="center">React Tournament Brackets</h3>

  <p align="center">
    A straightforward implementation of single eliminations and double eliminations brackets in react
    <br />
    <a href="https://sleepy-kare-d8538d.netlify.app/?path=/story/components-bracket--bracket"><strong>Explore the storybook »</strong></a>
    <br />
    <br />
    <a href="https://sleepy-kare-d8538d.netlify.app/?path=/story/components-bracket--bracket">View Live Demo</a>
    ·
    <a href="https://github.com/g-loot/react-tournament-brackets/issues">Report Bug</a>
    ·
    <a href="https://github.com/g-loot/react-tournament-brackets/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#basic-usage">Basic Usage</a></li>
        <li><a href="#data-structures">Data structures</a></li>
        <li><a href="#theming-and-styling">Theming and styling</a></li>
      </ul>
    </li>
     <li>
          <li><a href="#contributing">Contributing</a></li>
      <ul>
        <li><a href="#contributer-testing-guide">Contributer Testing Guide</a></li>
      </ul>
    </li>

    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
- Screenshot Of single elimination bracket out of the box
[![Single elimination screenshot][single-bracket-screenshot]][single-demo-url]
- Screenshot Of double elimination bracket out of the box
[![Double elimination screenshot][double-bracket-screenshot]][double-demo-url]

I was scouring the world wide web for a good component library for visualizing single elimination brackets or double elimination brackets but most of them had complicated data structures or didn't allow for easy styling, and so I had to build my own, and decided to share it with the world.
### Built With

You only need to have react installed in your project to use this project.
* [React](https://reactjs.org/)
* [Styled Components](https://styled-components.com/)


**Note:** default browser css is reset using the [minireset.css package](https://github.com/jgthms/minireset.css/) in the storybook demos. To fully control what the match component looks like you can build and supply your own view component for it 
## Getting Started
### Installation
  This project is hosted on the public npm registry, here's the [link to the npm page](https://www.npmjs.com/package/@g-loot/react-tournament-brackets)
  ```sh
  npm install @g-loot/react-tournament-brackets
  ```

<!-- USAGE EXAMPLES -->
## Basic Usage

### Basics of the library
`import { SingleEliminationBracket, DoubleEliminationBracket, Match, MATCH_STATES, SVGViewer } from '@g-loot/react-tournament-brackets';`
| Component     | Description   |
| ------------- |:-------------|
| SingleEliminationBracket | Component for displaying single elimination bracket |
| DoubleEliminationBracket | Component for displaying double elimination bracket |
| Match                    | Default component for rendering matches that can be overridden |
| MATCH_STATES             | Constant containing enum for Match states and Participants statuses |
| SVGViewer                | Optional component for displaying the bracket in a fixed size window with panning and zooming functionality |

### Using the components
This component generates an SVG of all your bracket matches, you can use the supplied optional component `<SVGViewer />` like in the following example to wrap the SVG in a fixed size window with panning and zooming functionality, Note that you're also free to come up with your own solution for allowing the user to navigate giant brackets with ease.
```js
import { SingleEliminationBracket, DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';
export const DoubleElimination = () => (
  <DoubleEliminationBracket
    matches={matches}
    matchComponent={Match}
    svgWrapper={({ children, ...props }) => (
      <SVGViewer width={500} height={500} {...props}>
        {children}
      </SVGViewer>
    )}
  />
);
export const SingleElimination = () => (
  <SingleEliminationBracket
    matches={matches}
    matchComponent={Match}
    svgWrapper={({ children, ...props }) => (
      <SVGViewer width={500} height={500} {...props}>
        {children}
      </SVGViewer>
    )}
  />
);
```

- If you want the `SVGViewer` to fit it's container you will need some sort of hook to achieve that, like [useWindowSize()](https://usehooks.com/useWindowSize/), [useComponentSize](https://github.com/rehooks/component-size) or your own custom solution
```js
import { DoubleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';

export const DoubleElimination = () => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <DoubleEliminationBracket
      matches={matches}
      matchComponent={Match}
      svgWrapper={({ children, ...props }) => (
        <SVGViewer width={finalWidth} height={finalHeight} {...props}>
          {children}
        </SVGViewer>
      )}
    />
  );
};
```
_For more examples, please refer to the [Storybook][demo-url]_

### Data structures
- Single Eliminations `matches` prop structure
```json
[
  ...,
  {
    "id": 260005,
    "name": "Final - Match",
    "nextMatchId": null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
    "tournamentRoundText": "4", // Text for Round Header
    "startTime": "2021-05-30",
    "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
    "participants": [
      {
        "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
        "resultText": "WON", // Any string works
        "isWinner": false,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
        "name": "giacomo123"
      },
      {
        "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
        "resultText": null,
        "isWinner": true,
        "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
        "name": "Ant"
      }
    ]
  }
  ...
]

```
- Double Eliminations `matches` prop structure
```json
{
  "upper": [
    ...,
    {
      "id": 260006, // Unique identifier of any kind
      "name": "Semi Final - Match",
      "nextMatchId": null,  // Id for the next match in upper bracket, if it's final match it must be null OR undefined
      "nextLooserMatchId": null,  // Id for the next match in lower bracket, if it's final match or a lower bracket match it must be null OR undefined
      "startTime": "2021-05-30",
      "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
      "participants": [
        {
          "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
          "resultText": "WON", // Any string works
          "isWinner": false,
          "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
          "name": "giacomo123"
        },
        {
          "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
          "resultText": "LOST", // Any string works
          "isWinner": true,
          "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
          "name": "Ant"
        }
      ]
    }
    ...
  ],
  "lower": [
    ...,
    {
      "id": 260005,
      "name": "Semi Final - Match",
      "nextMatchId": 260006,
      "nextLooserMatchId": null,
      "tournamentRoundText": "4",
      "startTime": "2021-05-30",
      "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
      "participants": [
        {
          "id": "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
          "resultText": "WON", // Any string works
          "isWinner": false,
          "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
          "name": "giacomo123"
        },
        {
          "id": "9ea9ce1a-4794-4553-856c-9a3620c0531b",
          "resultText": null,
          "isWinner": true,
          "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
          "name": "Ant"
        }
      ]
    }
    ...
  ]
}
```
- Double Eliminations `matches` prop structure with double finals, Keep the same structure and add a nextMatchId + nextLooserMatchId pointing to a new match in the same bracket (the finals can be in upper or in lower bracket) _For more examples of valid double finals data, check out the [mock data folder](https://github.com/g-loot/react-tournament-brackets/tree/master/src/mock-data) specifically  [data-double-last-game-lower.ts](https://github.com/g-loot/react-tournament-brackets/tree/master/src/mock-data/data-double-last-game-lower.ts) and [data-double-last-game-upper-double-playoffs.ts](https://github.com/g-loot/react-tournament-brackets/tree/master/src/mock-data/data-double-last-game-upper-double-playoffs.ts) _
```json
{
  [upper|lower]: [
    ...,
    {
      "id": "WB R5 M1",
      "name": "WB R5 M1",
      "nextMatchId": "WB R6 M1",
      "nextLooserMatchId": "WB R6 M1",
      "startTime": null,
      "tournamentRound": "R5",
      "state": "SCORE_DONE",
      "participants": [
        {
          "id": "ddfee063-adde-4192-95d2-203eb2ebb8f7",
          "resultText": "",
          "isWinner": false,
          "status": "PLAYED",
          "name": "#1"
        }
      ]
    },
    {
      "id": "WB R6 M1",
      "name": "WB R6 M1",
      "nextMatchId": null,
      "nextLooserMatchId": null,
      "startTime": null,
      "tournamentRound": "R6",
      "state": "SCORE_DONE",
      "participants": []
    }
    ...,
  ]
}


```
- Match / Participant States are defined in the exported constant `MATCH_STATES`
```js
import { MATCH_STATES } from '@g-loot/react-tournament-brackets';
console.log(MATCH_STATES);
// {
//   PLAYED: 'PLAYED',
//   NO_SHOW: 'NO_SHOW',
//   WALK_OVER: 'WALK_OVER',
//   NO_PARTY: 'NO_PARTY',
//   DONE: 'DONE',
//   SCORE_DONE: 'SCORE_DONE',
// };

```

_For more examples of accepted data, check out the [mock data folder](https://github.com/g-loot/react-tournament-brackets/tree/master/src/mock-data)_


## Theming and Styling
This component's default theme is the dark theme in the screenshot, you can use the function `createTheme` which is exported from the library to create a theme and then pass it to either single or double bracket on the `theme` prop
A few notes: 
- Some colors like the roundHeaders, and connectors aren't tied to the theme yet, you'll need to style those through the `options` prop manually for now, In the very near future they will be tied to the theme as well!
#### Full Example of custom theming:
```js
import { SingleEliminationBracket, Match, SVGViewer, createTheme } from '@g-loot/react-tournament-brackets';

const WhiteTheme = createTheme({
  textColor: { main: '#000000', highlighted: '#07090D', dark: '#3E414D' },
  matchBackground: { wonColor: '#daebf9', lostColor: '#96c6da' },
  score: {
    background: { wonColor: '#87b2c4', lostColor: '#87b2c4' },
    text: { highlightedWonColor: '#7BF59D', highlightedLostColor: '#FB7E94' },
  },
  border: {
    color: '#CED1F2',
    highlightedColor: '#da96c6',
  },
  roundHeader: { backgroundColor: '#da96c6', fontColor: '#000' },
  connectorColor: '#CED1F2',
  connectorColorHighlight: '#da96c6',
  svgBackground: '#FAFAFA',
});

export const WhiteThemeBracket = () => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);

  return (
    <SingleEliminationBracket
      matches={simpleSmallBracket}
      matchComponent={Match}
      theme={WhiteTheme}
      options={{
        style: {
          roundHeader: {
            backgroundColor: WhiteTheme.roundHeader.backgroundColor,
            fontColor: WhiteTheme.roundHeader.fontColor,
          },
          connectorColor: WhiteTheme.connectorColor,
          connectorColorHighlight: WhiteTheme.connectorColorHighlight,
        },
      }}
      svgWrapper={({ children, ...props }) => (
        <SvgViewer
          background={WhiteTheme.svgBackground}
          SVGBackground={WhiteTheme.svgBackground}
          width={finalWidth}
          height={finalHeight}
          {...props}
        >
          {children}
        </SvgViewer>
      )}
    />
  );
};
```
### If themes aren't enough for you you can always supply your own Match view component and use the props passed to it to override the match view rendering, Again you'll need to style the round headers and connector lines using `options` prop

#### Basic example of custom match component
```js
import { SingleEliminationBracket, SVGViewer } from '@g-loot/react-tournament-brackets';

export const CustomMatchBracket = () => {
  const [width, height] = useWindowSize();
  const finalWidth = Math.max(width - 50, 500);
  const finalHeight = Math.max(height - 100, 500);
  return (
    <SingleEliminationBracket
      matches={simpleSmallBracket}
      options={{
        style: {
          roundHeader: { backgroundColor: '#AAA' },
          connectorColor: '#FF8C00',
          connectorColorHighlight: '#000',
        },
      }}
      svgWrapper={({ children, ...props }) => (
        <SvgViewer
          background="#FFF"
          SVGBackground="#FFF"
          width={finalWidth}
          height={finalHeight}
          {...props}
        >
          {children}
        </SvgViewer>
      )}
      matchComponent={({
        match,
        onMatchClick,
        onPartyClick,
        onMouseEnter,
        onMouseLeave,
        topParty,
        bottomParty,
        topWon,
        bottomWon,
        topHovered,
        bottomHovered,
        topText,
        bottomText,
        connectorColor,
        computedStyles,
        teamNameFallback,
        resultFallback,
      }) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            color: '#000',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            onMouseEnter={() => onMouseEnter(topParty.id)}
            style={{ display: 'flex' }}
          >
            <div>{topParty.name || teamNameFallback}</div>
            <div>{topParty.resultText ?? resultFallback(topParty)}</div>
          </div>
          <div
            style={{ height: '1px', width: '100%', background: '#FF8C00' }}
          />
          <div
            onMouseEnter={() => onMouseEnter(bottomParty.id)}
            style={{ display: 'flex' }}
          >
            <div>{bottomParty.name || teamNameFallback}</div>
            <div>{bottomParty.resultText ?? resultFallback(topParty)}</div>
          </div>
        </div>
      )}
    />
  );
};
```


_For more examples, checkout the [live storybook][demo-url]_



<!-- LICENSE -->
## License

Distributed under the GNU LGPL v2.1 License. See `LICENSE` for more information.



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. For automatic feedback if you're editing the components or adding new ones run `npm run dev`
4. Test your changes according to the [Contributor Testing Guide](#contributer-testing-guide)
5. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the Branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request


## Contributer Testing Guide

### Unit tests and linting
- Run: `npm run test`
- Run: `npm run lint`
### Checking that storybook works
- Run: `npm run build-storybook` to check that it builds the storybook demo website correctly
### Checking that the package works when consumed by a test project
- Run: `npm run test-lib-build` for testing that the package builds and packs into an npm package correctly 
- Follow the guide for both [nextjs](./demos/nextjs/README.md) and [create-react-app](./demos/create-react-app/README.md) project examples

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* Inspiration for allowing user to theme the bracket utlizing styled-components wthout exposing the library from [React Data Table Component](https://github.com/jbetancur/react-data-table-component/)
* Library used for the optional component SVGViewer for zooming and panning the bracket [React SVG Pan Zoom](https://github.com/chrvadala/react-svg-pan-zoom)





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/g-loot/react-tournament-brackets.svg?style=for-the-badge
[contributors-url]: https://github.com/g-loot/react-tournament-brackets/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/g-loot/react-tournament-brackets.svg?style=for-the-badge
[forks-url]: https://github.com/g-loot/react-tournament-brackets/network/members
[stars-shield]: https://img.shields.io/github/stars/g-loot/react-tournament-brackets.svg?style=for-the-badge
[stars-url]: https://github.com/g-loot/react-tournament-brackets/stargazers
[issues-shield]: https://img.shields.io/github/issues/g-loot/react-tournament-brackets.svg?style=for-the-badge
[issues-url]: https://github.com/g-loot/react-tournament-brackets/issues
[single-bracket-screenshot]: images/screenshot_single.png
[double-bracket-screenshot]: images/screenshot_double.png
[single-demo-url]: https://sleepy-kare-d8538d.netlify.app/?path=/story/components-bracket--bracket
[double-demo-url]: https://sleepy-kare-d8538d.netlify.app/?path=/story/components-doubleelim--double-elimination

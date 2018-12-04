import { createGlobalStyle } from 'styled-components';

createGlobalStyle`

  @font-face{
    font-family: 'montserratultra_light';
    src: url('./font/montserrat-ultralight-webfont.eot');
    src: url('./font/montserrat-ultralight-webfont.eot') format('embedded-opentype'), url('./font/montserrat-ultralight-webfont.woff') format('woff'), url('./font/montserrat-ultralight-webfont.ttf') format('truetype'), url('./font/montserrat-ultralight-webfont.svg') format('svg');
    font-weight: normal;font-style: normal;
}

@font-face {    
    font-family: 'pixel_emulatorregular';    
    src: url('./font/pixel_emulator-webfont.eot');    
    src: url('./font/pixel_emulator-webfont.eot?#iefix') format('embedded-opentype'), url('./font/pixel_emulator-webfont.woff') format('woff'), url('./font/pixel_emulator-webfont.ttf') format('truetype'), url('./font/pixel_emulator-webfont.svg#pixel_emulatorregular') format('svg');
    font-weight: normal;
    font-style: normal;
}

@font-face{
    font-family: 'icomoon';
    src: url('./font/icomoon.eot');
    src: url('./font/icomoon.eot') format('embedded-opentype'), url('./font/icomoon.woff') format('woff'), url('./font/icomoon.ttf') format('truetype'), url('./font/icomoon.svg') format('svg');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: "HelveticaNeue-Bold";
    src: url('./font/HelveticaNeue-Bold.woff?-kewlib&v=1979') format('woff'), url('./font/HelveticaNeue-Bold.ttf?-kewlib&v=1979') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

#gfsdk_root_new {
  overflow-y: scroll;
  height: 100vh;
  border: 3px solid red; 
}
`
;
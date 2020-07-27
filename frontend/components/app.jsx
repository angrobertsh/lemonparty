import React from 'react';
import Topbar from './topbar/topbar';
import LemonContainerContainer from './lemon/lemon_container_container';
import LemonBackgroundChanger from './lemon/lemon_background_changer';
import LemonModalContainer from './lemon_modal/lemon_modal_container';

const App = () => (
  <div id="page">
    <LemonModalContainer />
    <LemonBackgroundChanger />
    <div id="app">
      <Topbar />
      <LemonContainerContainer />
    </div>
  </div>
);

export default App;

// <App>
//   <Topbar />
//   <Search>
//     <TruckMapContainer />
//     <TruckIndexContainer>
//       <SearchFormContainer />
//       <div>
//         <TruckIndexItem />
//         <TruckIndexItem />
//         <TruckIndexItem />
//       </div>
//       <TruckIndexItem /> <=== TruckFocus
//     </TruckIndexContainer>
//   </Search>
// </App>
//
// <App>
//   <Topbar />
//   <LemonContainer>
//     <LemonMapContainer />
//     <div>
//       <div>
//         <LemonIndexContainer>
//           <div>
//             <LemonIndexItem />
//             <LemonIndexItem />
//             <LemonIndexItem />
//           </div>
//         </LemonIndexContainer>
//         <LemonAddButton />
//       </div>
//       <div>
//         <LemonFocusContainer />
//       </div>
//       <LemonForm />
//     </div>
//   </LemonContainer>
// </App>

import React from 'react';
import Topbar from './topbar/topbar';
import LemonContainer from './lemon/lemon_container';

const App = ({children}) => (
  <div id="page">
    <div id="app">
      <Topbar />
      <LemonContainer />
      {children}
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
//           <LemonFocusContainer />
//         </LemonIndexContainer>
//         <LemonAddButton />
//       </div>
//       <LemonForm />
//     </div>
//   </LemonContainer>
// </App>

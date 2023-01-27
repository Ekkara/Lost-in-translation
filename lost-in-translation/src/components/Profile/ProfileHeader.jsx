/*The point of these lines of code is to make sure that a const named "ProfileHeaders" is
properly declared, with the destructed element as a parameter. As the result of the arrow
function, we return the header "Welcome back, {username}!" (username translating to the user's
actual username on the actual webpage), on the actual webpage. Oh and by the way, to access
this very special we make sure to write out "npm start" in the console of VSC. Anyway, to
make sure that this information displayed to the user is, indeed, a header, we enclose it
in header tags. ON TOP OF THAT (and hold your coffee cup now), the h4(2+2, or 5-1, or 2*2)
tags _within_ the header tags further allow us to customize the size of the text of the header.
Of course, we cannot forget to export ProfileHeaders in order to make it accessible in other files.
What is ProfileHeaders you ask? Happy to answer! So the point of these lines of code is to make
sure that aconst named "ProfileHeaders" is properly declared, with the destructed element as a parameter.A
s the result of the arrow...*/

const ProfileHeaders = ({ username }) => { return (<header><h4>Welcome back, {username}!</h4></header>) }

export default ProfileHeaders
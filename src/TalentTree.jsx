import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

const RAW_DATA = '[{"id":1,"icon":[8000001],"q":1,"x":663.0,"y":510.0,"act":[],"ranks":[{"r":1,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +20","attr":[{"type":2,"value":20}]},{"r":2,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +40","attr":[{"type":2,"value":40}]},{"r":3,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +60","attr":[{"type":2,"value":60}]}],"maxRank":3},{"id":2,"icon":[8000001],"q":1,"x":423.0,"y":762.0,"act":[],"ranks":[{"r":1,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +20","attr":[{"type":2,"value":20}]},{"r":2,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +40","attr":[{"type":2,"value":40}]},{"r":3,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +60","attr":[{"type":2,"value":60}]}],"maxRank":3},{"id":3,"icon":[8000001],"q":1,"x":483.0,"y":804.0,"act":[93003,124003],"ranks":[{"r":1,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +20","attr":[{"type":2,"value":20}]},{"r":2,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +40","attr":[{"type":2,"value":40}]},{"r":3,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +60","attr":[{"type":2,"value":60}]}],"maxRank":3},{"id":4,"icon":[8000001],"q":1,"x":243.0,"y":804.0,"act":[123003,112003],"ranks":[{"r":1,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +20","attr":[{"type":2,"value":20}]},{"r":2,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +40","attr":[{"type":2,"value":40}]},{"r":3,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +60","attr":[{"type":2,"value":60}]}],"maxRank":3},{"id":5,"icon":[8000001],"q":1,"x":363.0,"y":1056.0,"act":[85003,6003,88003],"ranks":[{"r":1,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +20","attr":[{"type":2,"value":20}]},{"r":2,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +40","attr":[{"type":2,"value":40}]},{"r":3,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +60","attr":[{"type":2,"value":60}]}],"maxRank":3},{"id":6,"icon":[8000001],"q":1,"x":303.0,"y":1056.0,"act":[372005,5003],"ranks":[{"r":1,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +20","attr":[{"type":2,"value":20}]},{"r":2,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +40","attr":[{"type":2,"value":40}]},{"r":3,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +60","attr":[{"type":2,"value":60}]}],"maxRank":3},{"id":7,"icon":[8000001],"q":1,"x":303.0,"y":1140.0,"act":[129003,89003],"ranks":[{"r":1,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +20","attr":[{"type":2,"value":20}]},{"r":2,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +40","attr":[{"type":2,"value":40}]},{"r":3,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +60","attr":[{"type":2,"value":60}]}],"maxRank":3},{"id":8,"icon":[8000001],"q":1,"x":603.0,"y":342.0,"act":[178003,166003],"ranks":[{"r":1,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +20","attr":[{"type":2,"value":20}]},{"r":2,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +40","attr":[{"type":2,"value":40}]},{"r":3,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +60","attr":[{"type":2,"value":60}]}],"maxRank":3},{"id":9,"icon":[8000001],"q":1,"x":723.0,"y":258.0,"act":[188003,187003,68003,370005],"ranks":[{"r":1,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +20","attr":[{"type":2,"value":20}]},{"r":2,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +40","attr":[{"type":2,"value":40}]},{"r":3,"name":["HP","HP","HP","HP","HP"],"desc":null,"stat":"HP +60","attr":[{"type":2,"value":60}]}],"maxRank":3},{"id":11,"icon":[8000002],"q":1,"x":783.0,"y":594.0,"act":[43003,300005],"ranks":[{"r":1,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +20","attr":[{"type":3,"value":20}]},{"r":2,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +40","attr":[{"type":3,"value":40}]},{"r":3,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +60","attr":[{"type":3,"value":60}]}],"maxRank":3},{"id":12,"icon":[8000002],"q":1,"x":663.0,"y":762.0,"act":[],"ranks":[{"r":1,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +20","attr":[{"type":3,"value":20}]},{"r":2,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +40","attr":[{"type":3,"value":40}]},{"r":3,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +60","attr":[{"type":3,"value":60}]}],"maxRank":3},{"id":13,"icon":[8000002],"q":1,"x":723.0,"y":804.0,"act":[133003,44003],"ranks":[{"r":1,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +20","attr":[{"type":3,"value":20}]},{"r":2,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +40","attr":[{"type":3,"value":40}]},{"r":3,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +60","attr":[{"type":3,"value":60}]}],"maxRank":3},{"id":14,"icon":[8000002],"q":1,"x":903.0,"y":846.0,"act":[103003,45003,205003],"ranks":[{"r":1,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +20","attr":[{"type":3,"value":20}]},{"r":2,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +40","attr":[{"type":3,"value":40}]},{"r":3,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +60","attr":[{"type":3,"value":60}]}],"maxRank":3},{"id":15,"icon":[8000002],"q":1,"x":723.0,"y":1056.0,"act":[24003,108003],"ranks":[{"r":1,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +20","attr":[{"type":3,"value":20}]},{"r":2,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +40","attr":[{"type":3,"value":40}]},{"r":3,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +60","attr":[{"type":3,"value":60}]}],"maxRank":3},{"id":16,"icon":[8000002],"q":1,"x":603.0,"y":930.0,"act":[391005,81003,106003,121003,23003],"ranks":[{"r":1,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +20","attr":[{"type":3,"value":20}]},{"r":2,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +40","attr":[{"type":3,"value":40}]},{"r":3,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +60","attr":[{"type":3,"value":60}]}],"maxRank":3},{"id":17,"icon":[8000002],"q":1,"x":423.0,"y":510.0,"act":[],"ranks":[{"r":1,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +20","attr":[{"type":3,"value":20}]},{"r":2,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +40","attr":[{"type":3,"value":40}]},{"r":3,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +60","attr":[{"type":3,"value":60}]}],"maxRank":3},{"id":18,"icon":[8000002],"q":1,"x":303.0,"y":384.0,"act":[302005,73003,195003],"ranks":[{"r":1,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +20","attr":[{"type":3,"value":20}]},{"r":2,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +40","attr":[{"type":3,"value":40}]},{"r":3,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +60","attr":[{"type":3,"value":60}]}],"maxRank":3},{"id":19,"icon":[8000002],"q":1,"x":483.0,"y":342.0,"act":[77003,381005],"ranks":[{"r":1,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +20","attr":[{"type":3,"value":20}]},{"r":2,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +40","attr":[{"type":3,"value":40}]},{"r":3,"name":["MP","MP","MP","MP","MP"],"desc":null,"stat":"MP +60","attr":[{"type":3,"value":60}]}],"maxRank":3},{"id":21,"icon":[8000000],"q":1,"x":963.0,"y":636.0,"act":[42003,49003,203003],"ranks":[{"r":1,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +5","attr":[{"type":141,"value":5}]},{"r":2,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +10","attr":[{"type":141,"value":10}]},{"r":3,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +15","attr":[{"type":141,"value":15}]}],"maxRank":3},{"id":22,"icon":[8000000],"q":1,"x":723.0,"y":720.0,"act":[],"ranks":[{"r":1,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +5","attr":[{"type":141,"value":5}]},{"r":2,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +10","attr":[{"type":141,"value":10}]},{"r":3,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +15","attr":[{"type":141,"value":15}]}],"maxRank":3},{"id":23,"icon":[8000000],"q":1,"x":723.0,"y":930.0,"act":[16003,24003],"ranks":[{"r":1,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +5","attr":[{"type":141,"value":5}]},{"r":2,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +10","attr":[{"type":141,"value":10}]},{"r":3,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +15","attr":[{"type":141,"value":15}]}],"maxRank":3},{"id":24,"icon":[8000000],"q":1,"x":723.0,"y":972.0,"act":[23003,134003,108003,15003],"ranks":[{"r":1,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +5","attr":[{"type":141,"value":5}]},{"r":2,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +10","attr":[{"type":141,"value":10}]},{"r":3,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +15","attr":[{"type":141,"value":15}]}],"maxRank":3},{"id":25,"icon":[8000000],"q":1,"x":1023.0,"y":972.0,"act":[206003,107003],"ranks":[{"r":1,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +5","attr":[{"type":141,"value":5}]},{"r":2,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +10","attr":[{"type":141,"value":10}]},{"r":3,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +15","attr":[{"type":141,"value":15}]}],"maxRank":3},{"id":26,"icon":[8000000],"q":1,"x":963.0,"y":1056.0,"act":[47003,371005,109003],"ranks":[{"r":1,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +5","attr":[{"type":141,"value":5}]},{"r":2,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +10","attr":[{"type":141,"value":10}]},{"r":3,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +15","attr":[{"type":141,"value":15}]}],"maxRank":3},{"id":27,"icon":[8000000],"q":1,"x":663.0,"y":1098.0,"act":[208003,500007],"ranks":[{"r":1,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +5","attr":[{"type":141,"value":5}]},{"r":2,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +10","attr":[{"type":141,"value":10}]},{"r":3,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +15","attr":[{"type":141,"value":15}]}],"maxRank":3},{"id":28,"icon":[8000000],"q":1,"x":783.0,"y":1140.0,"act":[108003,136003,371005],"ranks":[{"r":1,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +5","attr":[{"type":141,"value":5}]},{"r":2,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +10","attr":[{"type":141,"value":10}]},{"r":3,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +15","attr":[{"type":141,"value":15}]}],"maxRank":3},{"id":29,"icon":[8000000],"q":1,"x":903.0,"y":762.0,"act":[552007,48003,103003],"ranks":[{"r":1,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +5","attr":[{"type":141,"value":5}]},{"r":2,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +10","attr":[{"type":141,"value":10}]},{"r":3,"name":["Min ATK","Min Magic","Min Tao","Min ATK","Min ATK"],"desc":null,"stat":"Min ATK +15","attr":[{"type":141,"value":15}]}],"maxRank":3},{"id":31,"icon":[8000000],"q":1,"x":123.0,"y":804.0,"act":[51003,149003,125003],"ranks":[{"r":1,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +5","attr":[{"type":142,"value":5}]},{"r":2,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +10","attr":[{"type":142,"value":10}]},{"r":3,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +15","attr":[{"type":142,"value":15}]}],"maxRank":3},{"id":32,"icon":[8000000],"q":1,"x":183.0,"y":888.0,"act":[112003,125003,143003,34003],"ranks":[{"r":1,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +5","attr":[{"type":142,"value":5}]},{"r":2,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +10","attr":[{"type":142,"value":10}]},{"r":3,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +15","attr":[{"type":142,"value":15}]}],"maxRank":3},{"id":33,"icon":[8000000],"q":1,"x":303.0,"y":972.0,"act":[142003,126003,331005,95003,85003],"ranks":[{"r":1,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +5","attr":[{"type":142,"value":5}]},{"r":2,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +10","attr":[{"type":142,"value":10}]},{"r":3,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +15","attr":[{"type":142,"value":15}]}],"maxRank":3},{"id":34,"icon":[8000000],"q":1,"x":183.0,"y":972.0,"act":[32003,144003,351005,127003],"ranks":[{"r":1,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +5","attr":[{"type":142,"value":5}]},{"r":2,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +10","attr":[{"type":142,"value":10}]},{"r":3,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +15","attr":[{"type":142,"value":15}]}],"maxRank":3},{"id":35,"icon":[8000000],"q":1,"x":63.0,"y":1014.0,"act":[145003,147003],"ranks":[{"r":1,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +5","attr":[{"type":142,"value":5}]},{"r":2,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +10","attr":[{"type":142,"value":10}]},{"r":3,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +15","attr":[{"type":142,"value":15}]}],"maxRank":3},{"id":36,"icon":[8000000],"q":1,"x":243.0,"y":1098.0,"act":[146003,129003],"ranks":[{"r":1,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +5","attr":[{"type":142,"value":5}]},{"r":2,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +10","attr":[{"type":142,"value":10}]},{"r":3,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +15","attr":[{"type":142,"value":15}]}],"maxRank":3},{"id":37,"icon":[8000000],"q":1,"x":63.0,"y":1098.0,"act":[530007,128003],"ranks":[{"r":1,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +5","attr":[{"type":142,"value":5}]},{"r":2,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +10","attr":[{"type":142,"value":10}]},{"r":3,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +15","attr":[{"type":142,"value":15}]}],"maxRank":3},{"id":38,"icon":[8000000],"q":1,"x":363.0,"y":720.0,"act":[],"ranks":[{"r":1,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +5","attr":[{"type":142,"value":5}]},{"r":2,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +10","attr":[{"type":142,"value":10}]},{"r":3,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +15","attr":[{"type":142,"value":15}]}],"maxRank":3},{"id":39,"icon":[8000000],"q":1,"x":123.0,"y":678.0,"act":[149003,192003],"ranks":[{"r":1,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +5","attr":[{"type":142,"value":5}]},{"r":2,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +10","attr":[{"type":142,"value":10}]},{"r":3,"name":["Max ATK","Max Magic","Max Tao","Max ATK","Max ATK"],"desc":null,"stat":"Max ATK +15","attr":[{"type":142,"value":15}]}],"maxRank":3},{"id":41,"icon":[8000001],"q":1,"x":903.0,"y":510.0,"act":[63003,300005,62003],"ranks":[{"r":1,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +5","attr":[{"type":5,"value":5}]},{"r":2,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +10","attr":[{"type":5,"value":10}]},{"r":3,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +15","attr":[{"type":5,"value":15}]}],"maxRank":3},{"id":42,"icon":[8000001],"q":1,"x":963.0,"y":594.0,"act":[21003,156003,132003],"ranks":[{"r":1,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +5","attr":[{"type":5,"value":5}]},{"r":2,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +10","attr":[{"type":5,"value":10}]},{"r":3,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +15","attr":[{"type":5,"value":15}]}],"maxRank":3},{"id":43,"icon":[8000001],"q":1,"x":783.0,"y":636.0,"act":[],"ranks":[{"r":1,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +5","attr":[{"type":5,"value":5}]},{"r":2,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +10","attr":[{"type":5,"value":10}]},{"r":3,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +15","attr":[{"type":5,"value":15}]}],"maxRank":3},{"id":44,"icon":[8000001],"q":1,"x":783.0,"y":762.0,"act":[204003,13003,104003],"ranks":[{"r":1,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +5","attr":[{"type":5,"value":5}]},{"r":2,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +10","attr":[{"type":5,"value":10}]},{"r":3,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +15","attr":[{"type":5,"value":15}]}],"maxRank":3},{"id":45,"icon":[8000001],"q":1,"x":843.0,"y":846.0,"act":[104003,14003],"ranks":[{"r":1,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +5","attr":[{"type":5,"value":5}]},{"r":2,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +10","attr":[{"type":5,"value":10}]},{"r":3,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +15","attr":[{"type":5,"value":15}]}],"maxRank":3},{"id":46,"icon":[8000001],"q":1,"x":903.0,"y":930.0,"act":[205003,551007],"ranks":[{"r":1,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +5","attr":[{"type":5,"value":5}]},{"r":2,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +10","attr":[{"type":5,"value":10}]},{"r":3,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +15","attr":[{"type":5,"value":15}]}],"maxRank":3},{"id":47,"icon":[8000001],"q":1,"x":963.0,"y":1014.0,"act":[107003,26003],"ranks":[{"r":1,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +5","attr":[{"type":5,"value":5}]},{"r":2,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +10","attr":[{"type":5,"value":10}]},{"r":3,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +15","attr":[{"type":5,"value":15}]}],"maxRank":3},{"id":48,"icon":[8000001],"q":1,"x":963.0,"y":762.0,"act":[203003,29003],"ranks":[{"r":1,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +5","attr":[{"type":5,"value":5}]},{"r":2,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +10","attr":[{"type":5,"value":10}]},{"r":3,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +15","attr":[{"type":5,"value":15}]}],"maxRank":3},{"id":49,"icon":[8000001],"q":1,"x":903.0,"y":678.0,"act":[102003,21003],"ranks":[{"r":1,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +5","attr":[{"type":5,"value":5}]},{"r":2,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +10","attr":[{"type":5,"value":10}]},{"r":3,"name":["Min DEF","Min DEF","Min DEF","Min DEF","Min DEF"],"desc":null,"stat":"Min DEF +15","attr":[{"type":5,"value":15}]}],"maxRank":3},{"id":51,"icon":[8000001],"q":1,"x":63.0,"y":762.0,"act":[31003,149003,111003],"ranks":[{"r":1,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +5","attr":[{"type":6,"value":5}]},{"r":2,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +10","attr":[{"type":6,"value":10}]},{"r":3,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +15","attr":[{"type":6,"value":15}]}],"maxRank":3},{"id":52,"icon":[8000001],"q":1,"x":303.0,"y":720.0,"act":[171003,38003,141003],"ranks":[{"r":1,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +5","attr":[{"type":6,"value":5}]},{"r":2,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +10","attr":[{"type":6,"value":10}]},{"r":3,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +15","attr":[{"type":6,"value":15}]}],"maxRank":3},{"id":53,"icon":[8000001],"q":1,"x":303.0,"y":636.0,"act":[],"ranks":[{"r":1,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +5","attr":[{"type":6,"value":5}]},{"r":2,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +10","attr":[{"type":6,"value":10}]},{"r":3,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +15","attr":[{"type":6,"value":15}]}],"maxRank":3},{"id":54,"icon":[8000001],"q":1,"x":183.0,"y":636.0,"act":[53003,192003],"ranks":[{"r":1,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +5","attr":[{"type":6,"value":5}]},{"r":2,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +10","attr":[{"type":6,"value":10}]},{"r":3,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +15","attr":[{"type":6,"value":15}]}],"maxRank":3},{"id":55,"icon":[8000001],"q":1,"x":63.0,"y":636.0,"act":[71003,341005],"ranks":[{"r":1,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +5","attr":[{"type":6,"value":5}]},{"r":2,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +10","attr":[{"type":6,"value":10}]},{"r":3,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +15","attr":[{"type":6,"value":15}]}],"maxRank":3},{"id":56,"icon":[8000001],"q":1,"x":243.0,"y":552.0,"act":[332005,73003,512007,193003,115003],"ranks":[{"r":1,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +5","attr":[{"type":6,"value":5}]},{"r":2,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +10","attr":[{"type":6,"value":10}]},{"r":3,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +15","attr":[{"type":6,"value":15}]}],"maxRank":3},{"id":57,"icon":[8000001],"q":1,"x":63.0,"y":552.0,"act":[115003,71003],"ranks":[{"r":1,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +5","attr":[{"type":6,"value":5}]},{"r":2,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +10","attr":[{"type":6,"value":10}]},{"r":3,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +15","attr":[{"type":6,"value":15}]}],"maxRank":3},{"id":58,"icon":[8000001],"q":1,"x":123.0,"y":468.0,"act":[194003,73003],"ranks":[{"r":1,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +5","attr":[{"type":6,"value":5}]},{"r":2,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +10","attr":[{"type":6,"value":10}]},{"r":3,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +15","attr":[{"type":6,"value":15}]}],"maxRank":3},{"id":59,"icon":[8000001],"q":1,"x":183.0,"y":384.0,"act":[183003,511007,75003,179003],"ranks":[{"r":1,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +5","attr":[{"type":6,"value":5}]},{"r":2,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +10","attr":[{"type":6,"value":10}]},{"r":3,"name":["Max DEF","Max DEF","Max DEF","Max DEF","Max DEF"],"desc":null,"stat":"Max DEF +15","attr":[{"type":6,"value":15}]}],"maxRank":3},{"id":61,"icon":[8000000],"q":1,"x":723.0,"y":552.0,"act":[],"ranks":[{"r":1,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +5","attr":[{"type":151,"value":5}]},{"r":2,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +10","attr":[{"type":151,"value":10}]},{"r":3,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +15","attr":[{"type":151,"value":15}]}],"maxRank":3},{"id":62,"icon":[8000000],"q":1,"x":843.0,"y":552.0,"act":[131003,61003,41003],"ranks":[{"r":1,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +5","attr":[{"type":151,"value":5}]},{"r":2,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +10","attr":[{"type":151,"value":10}]},{"r":3,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +15","attr":[{"type":151,"value":15}]}],"maxRank":3},{"id":63,"icon":[8000000],"q":1,"x":903.0,"y":468.0,"act":[65003,161003,41003],"ranks":[{"r":1,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +5","attr":[{"type":151,"value":5}]},{"r":2,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +10","attr":[{"type":151,"value":10}]},{"r":3,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +15","attr":[{"type":151,"value":15}]}],"maxRank":3},{"id":64,"icon":[8000000],"q":1,"x":723.0,"y":426.0,"act":[152003,201003],"ranks":[{"r":1,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +5","attr":[{"type":151,"value":5}]},{"r":2,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +10","attr":[{"type":151,"value":10}]},{"r":3,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +15","attr":[{"type":151,"value":15}]}],"maxRank":3},{"id":65,"icon":[8000000],"q":1,"x":843.0,"y":384.0,"act":[152003,330005,161003,63003],"ranks":[{"r":1,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +5","attr":[{"type":151,"value":5}]},{"r":2,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +10","attr":[{"type":151,"value":10}]},{"r":3,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +15","attr":[{"type":151,"value":15}]}],"maxRank":3},{"id":66,"icon":[8000000],"q":1,"x":1023.0,"y":300.0,"act":[163003,162003,101003,153003],"ranks":[{"r":1,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +5","attr":[{"type":151,"value":5}]},{"r":2,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +10","attr":[{"type":151,"value":10}]},{"r":3,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +15","attr":[{"type":151,"value":15}]}],"maxRank":3},{"id":67,"icon":[8000000],"q":1,"x":903.0,"y":216.0,"act":[164003,154003,163003],"ranks":[{"r":1,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +5","attr":[{"type":151,"value":5}]},{"r":2,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +10","attr":[{"type":151,"value":10}]},{"r":3,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +15","attr":[{"type":151,"value":15}]}],"maxRank":3},{"id":68,"icon":[8000000],"q":1,"x":783.0,"y":300.0,"act":[9003,152003],"ranks":[{"r":1,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +5","attr":[{"type":151,"value":5}]},{"r":2,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +10","attr":[{"type":151,"value":10}]},{"r":3,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +15","attr":[{"type":151,"value":15}]}],"maxRank":3},{"id":69,"icon":[8000000],"q":1,"x":603.0,"y":510.0,"act":[165003,1003],"ranks":[{"r":1,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +5","attr":[{"type":151,"value":5}]},{"r":2,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +10","attr":[{"type":151,"value":10}]},{"r":3,"name":["Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG","Fixed DMG"],"desc":null,"stat":"Fixed DMG +15","attr":[{"type":151,"value":15}]}],"maxRank":3},{"id":71,"icon":[8000001],"q":1,"x":63.0,"y":594.0,"act":[57003,55003],"ranks":[{"r":1,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +5","attr":[{"type":152,"value":5}]},{"r":2,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +10","attr":[{"type":152,"value":10}]},{"r":3,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +15","attr":[{"type":152,"value":15}]}],"maxRank":3},{"id":72,"icon":[8000001],"q":1,"x":363.0,"y":552.0,"act":[],"ranks":[{"r":1,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +5","attr":[{"type":152,"value":5}]},{"r":2,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +10","attr":[{"type":152,"value":10}]},{"r":3,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +15","attr":[{"type":152,"value":15}]}],"maxRank":3},{"id":73,"icon":[8000001],"q":1,"x":243.0,"y":468.0,"act":[58003,119003,195003,56003],"ranks":[{"r":1,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +5","attr":[{"type":152,"value":5}]},{"r":2,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +10","attr":[{"type":152,"value":10}]},{"r":3,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +15","attr":[{"type":152,"value":15}]}],"maxRank":3},{"id":74,"icon":[8000001],"q":1,"x":483.0,"y":468.0,"act":[173003,195003,17003,181003],"ranks":[{"r":1,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +5","attr":[{"type":152,"value":5}]},{"r":2,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +10","attr":[{"type":152,"value":10}]},{"r":3,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +15","attr":[{"type":152,"value":15}]}],"maxRank":3},{"id":75,"icon":[8000001],"q":1,"x":123.0,"y":384.0,"act":[196003,59003],"ranks":[{"r":1,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +5","attr":[{"type":152,"value":5}]},{"r":2,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +10","attr":[{"type":152,"value":10}]},{"r":3,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +15","attr":[{"type":152,"value":15}]}],"maxRank":3},{"id":76,"icon":[8000001],"q":1,"x":183.0,"y":300.0,"act":[118003,199003],"ranks":[{"r":1,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +5","attr":[{"type":152,"value":5}]},{"r":2,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +10","attr":[{"type":152,"value":10}]},{"r":3,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +15","attr":[{"type":152,"value":15}]}],"maxRank":3},{"id":77,"icon":[8000001],"q":1,"x":483.0,"y":300.0,"act":[19003,178003],"ranks":[{"r":1,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +5","attr":[{"type":152,"value":5}]},{"r":2,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +10","attr":[{"type":152,"value":10}]},{"r":3,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +15","attr":[{"type":152,"value":15}]}],"maxRank":3},{"id":78,"icon":[8000001],"q":1,"x":123.0,"y":216.0,"act":[176003,186003],"ranks":[{"r":1,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +5","attr":[{"type":152,"value":5}]},{"r":2,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +10","attr":[{"type":152,"value":10}]},{"r":3,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +15","attr":[{"type":152,"value":15}]}],"maxRank":3},{"id":79,"icon":[8000001],"q":1,"x":483.0,"y":216.0,"act":[185003,342005,158003,168003],"ranks":[{"r":1,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +5","attr":[{"type":152,"value":5}]},{"r":2,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +10","attr":[{"type":152,"value":10}]},{"r":3,"name":["Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF","Fixed DEF"],"desc":null,"stat":"Fixed DEF +15","attr":[{"type":152,"value":15}]}],"maxRank":3},{"id":81,"icon":[8000002],"q":1,"x":603.0,"y":846.0,"act":[502007,133003,106003,391005,16003],"ranks":[{"r":1,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +1%","attr":[{"type":197,"value":100}]},{"r":2,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +2%","attr":[{"type":197,"value":200}]},{"r":3,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +3%","attr":[{"type":197,"value":300}]}],"maxRank":3},{"id":82,"icon":[8000002],"q":1,"x":543.0,"y":804.0,"act":[],"ranks":[{"r":1,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +1%","attr":[{"type":197,"value":100}]},{"r":2,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +2%","attr":[{"type":197,"value":200}]},{"r":3,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +3%","attr":[{"type":197,"value":300}]}],"maxRank":3},{"id":83,"icon":[8000002],"q":1,"x":363.0,"y":846.0,"act":[562007,142003,94003],"ranks":[{"r":1,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +1%","attr":[{"type":197,"value":100}]},{"r":2,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +2%","attr":[{"type":197,"value":200}]},{"r":3,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +3%","attr":[{"type":197,"value":300}]}],"maxRank":3},{"id":84,"icon":[8000002],"q":1,"x":543.0,"y":972.0,"act":[138003,139003],"ranks":[{"r":1,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +1%","attr":[{"type":197,"value":100}]},{"r":2,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +2%","attr":[{"type":197,"value":200}]},{"r":3,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +3%","attr":[{"type":197,"value":300}]}],"maxRank":3},{"id":85,"icon":[8000002],"q":1,"x":363.0,"y":1014.0,"act":[331005,33003,95003,5003],"ranks":[{"r":1,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +1%","attr":[{"type":197,"value":100}]},{"r":2,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +2%","attr":[{"type":197,"value":200}]},{"r":3,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +3%","attr":[{"type":197,"value":300}]}],"maxRank":3},{"id":86,"icon":[8000002],"q":1,"x":543.0,"y":1056.0,"act":[139003,96003,380005,97003],"ranks":[{"r":1,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +1%","attr":[{"type":197,"value":100}]},{"r":2,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +2%","attr":[{"type":197,"value":200}]},{"r":3,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +3%","attr":[{"type":197,"value":300}]}],"maxRank":3},{"id":87,"icon":[8000002],"q":1,"x":483.0,"y":1098.0,"act":[148003,89003,98003],"ranks":[{"r":1,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +1%","attr":[{"type":197,"value":100}]},{"r":2,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +2%","attr":[{"type":197,"value":200}]},{"r":3,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +3%","attr":[{"type":197,"value":300}]}],"maxRank":3},{"id":88,"icon":[8000002],"q":1,"x":363.0,"y":1098.0,"act":[5003,148003],"ranks":[{"r":1,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +1%","attr":[{"type":197,"value":100}]},{"r":2,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +2%","attr":[{"type":197,"value":200}]},{"r":3,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +3%","attr":[{"type":197,"value":300}]}],"maxRank":3},{"id":89,"icon":[8000002],"q":1,"x":423.0,"y":1140.0,"act":[7003,87003,98003],"ranks":[{"r":1,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +1%","attr":[{"type":197,"value":100}]},{"r":2,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +2%","attr":[{"type":197,"value":200}]},{"r":3,"name":["Respawn RES","Respawn RES","Respawn RES","Respawn RES","Respawn RES"],"desc":null,"stat":"Respawn RES +3%","attr":[{"type":197,"value":300}]}],"maxRank":3},{"id":91,"icon":[8000001],"q":1,"x":783.0,"y":888.0,"act":[104003,205003],"ranks":[{"r":1,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +0.5%","attr":[{"type":189,"value":50}]},{"r":2,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1%","attr":[{"type":189,"value":100}]},{"r":3,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1.5%","attr":[{"type":189,"value":150}]}],"maxRank":3},{"id":92,"icon":[8000001],"q":1,"x":543.0,"y":846.0,"act":[82003,391005],"ranks":[{"r":1,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +0.5%","attr":[{"type":189,"value":50}]},{"r":2,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1%","attr":[{"type":189,"value":100}]},{"r":3,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1.5%","attr":[{"type":189,"value":150}]}],"maxRank":3},{"id":93,"icon":[8000001],"q":1,"x":423.0,"y":804.0,"act":[2003,94003,301005,3003],"ranks":[{"r":1,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +0.5%","attr":[{"type":189,"value":50}]},{"r":2,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1%","attr":[{"type":189,"value":100}]},{"r":3,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1.5%","attr":[{"type":189,"value":150}]}],"maxRank":3},{"id":94,"icon":[8000001],"q":1,"x":423.0,"y":888.0,"act":[93003,83003,142003,331005],"ranks":[{"r":1,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +0.5%","attr":[{"type":189,"value":50}]},{"r":2,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1%","attr":[{"type":189,"value":100}]},{"r":3,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1.5%","attr":[{"type":189,"value":150}]}],"maxRank":3},{"id":95,"icon":[8000001],"q":1,"x":423.0,"y":972.0,"act":[331005,33003,85003,96003],"ranks":[{"r":1,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +0.5%","attr":[{"type":189,"value":50}]},{"r":2,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1%","attr":[{"type":189,"value":100}]},{"r":3,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1.5%","attr":[{"type":189,"value":150}]}],"maxRank":3},{"id":96,"icon":[8000001],"q":1,"x":423.0,"y":1056.0,"act":[95003,86003,148003],"ranks":[{"r":1,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +0.5%","attr":[{"type":189,"value":50}]},{"r":2,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1%","attr":[{"type":189,"value":100}]},{"r":3,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1.5%","attr":[{"type":189,"value":150}]}],"maxRank":3},{"id":97,"icon":[8000001],"q":1,"x":543.0,"y":1098.0,"act":[86003,122003],"ranks":[{"r":1,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +0.5%","attr":[{"type":189,"value":50}]},{"r":2,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1%","attr":[{"type":189,"value":100}]},{"r":3,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1.5%","attr":[{"type":189,"value":150}]}],"maxRank":3},{"id":98,"icon":[8000001],"q":1,"x":483.0,"y":1182.0,"act":[87003,89003,560007],"ranks":[{"r":1,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +0.5%","attr":[{"type":189,"value":50}]},{"r":2,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1%","attr":[{"type":189,"value":100}]},{"r":3,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1.5%","attr":[{"type":189,"value":150}]}],"maxRank":3},{"id":99,"icon":[8000001],"q":1,"x":723.0,"y":174.0,"act":[154003,188003],"ranks":[{"r":1,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +0.5%","attr":[{"type":189,"value":50}]},{"r":2,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1%","attr":[{"type":189,"value":100}]},{"r":3,"name":["Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down","Warrior DMG Down"],"desc":null,"stat":"Warrior DMG Down +1.5%","attr":[{"type":189,"value":150}]}],"maxRank":3},{"id":101,"icon":[8000001],"q":1,"x":963.0,"y":342.0,"act":[162003,66003,161003],"ranks":[{"r":1,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +0.5%","attr":[{"type":190,"value":50}]},{"r":2,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1%","attr":[{"type":190,"value":100}]},{"r":3,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1.5%","attr":[{"type":190,"value":150}]}],"maxRank":3},{"id":102,"icon":[8000001],"q":1,"x":843.0,"y":636.0,"act":[43003,49003],"ranks":[{"r":1,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +0.5%","attr":[{"type":190,"value":50}]},{"r":2,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1%","attr":[{"type":190,"value":100}]},{"r":3,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1.5%","attr":[{"type":190,"value":150}]}],"maxRank":3},{"id":103,"icon":[8000001],"q":1,"x":903.0,"y":804.0,"act":[29003,340005,14003],"ranks":[{"r":1,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +0.5%","attr":[{"type":190,"value":50}]},{"r":2,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1%","attr":[{"type":190,"value":100}]},{"r":3,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1.5%","attr":[{"type":190,"value":150}]}],"maxRank":3},{"id":104,"icon":[8000001],"q":1,"x":783.0,"y":846.0,"act":[44003,400005,45003,91003],"ranks":[{"r":1,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +0.5%","attr":[{"type":190,"value":50}]},{"r":2,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1%","attr":[{"type":190,"value":100}]},{"r":3,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1.5%","attr":[{"type":190,"value":150}]}],"maxRank":3},{"id":105,"icon":[8000001],"q":1,"x":1023.0,"y":846.0,"act":[340005,206003],"ranks":[{"r":1,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +0.5%","attr":[{"type":190,"value":50}]},{"r":2,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1%","attr":[{"type":190,"value":100}]},{"r":3,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1.5%","attr":[{"type":190,"value":150}]}],"maxRank":3},{"id":106,"icon":[8000001],"q":1,"x":663.0,"y":888.0,"act":[133003,81003,391005,16003],"ranks":[{"r":1,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +0.5%","attr":[{"type":190,"value":50}]},{"r":2,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1%","attr":[{"type":190,"value":100}]},{"r":3,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1.5%","attr":[{"type":190,"value":150}]}],"maxRank":3},{"id":107,"icon":[8000001],"q":1,"x":963.0,"y":972.0,"act":[207003,362005,25003,47003],"ranks":[{"r":1,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +0.5%","attr":[{"type":190,"value":50}]},{"r":2,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1%","attr":[{"type":190,"value":100}]},{"r":3,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1.5%","attr":[{"type":190,"value":150}]}],"maxRank":3},{"id":108,"icon":[8000001],"q":1,"x":783.0,"y":1056.0,"act":[24003,15003,28003,209003],"ranks":[{"r":1,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +0.5%","attr":[{"type":190,"value":50}]},{"r":2,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1%","attr":[{"type":190,"value":100}]},{"r":3,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1.5%","attr":[{"type":190,"value":150}]}],"maxRank":3},{"id":109,"icon":[8000001],"q":1,"x":963.0,"y":1098.0,"act":[26003,135003],"ranks":[{"r":1,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +0.5%","attr":[{"type":190,"value":50}]},{"r":2,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1%","attr":[{"type":190,"value":100}]},{"r":3,"name":["Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down","Mage DMG Down"],"desc":null,"stat":"Mage DMG Down +1.5%","attr":[{"type":190,"value":150}]}],"maxRank":3},{"id":111,"icon":[8000001],"q":1,"x":63.0,"y":804.0,"act":[51003,321005],"ranks":[{"r":1,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +0.5%","attr":[{"type":191,"value":50}]},{"r":2,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1%","attr":[{"type":191,"value":100}]},{"r":3,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1.5%","attr":[{"type":191,"value":150}]}],"maxRank":3},{"id":112,"icon":[8000001],"q":1,"x":183.0,"y":846.0,"act":[32003,4003],"ranks":[{"r":1,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +0.5%","attr":[{"type":191,"value":50}]},{"r":2,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1%","attr":[{"type":191,"value":100}]},{"r":3,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1.5%","attr":[{"type":191,"value":150}]}],"maxRank":3},{"id":113,"icon":[8000001],"q":1,"x":183.0,"y":1056.0,"act":[147003,146003],"ranks":[{"r":1,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +0.5%","attr":[{"type":191,"value":50}]},{"r":2,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1%","attr":[{"type":191,"value":100}]},{"r":3,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1.5%","attr":[{"type":191,"value":150}]}],"maxRank":3},{"id":114,"icon":[8000001],"q":1,"x":303.0,"y":594.0,"act":[193003,72003],"ranks":[{"r":1,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +0.5%","attr":[{"type":191,"value":50}]},{"r":2,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1%","attr":[{"type":191,"value":100}]},{"r":3,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1.5%","attr":[{"type":191,"value":150}]}],"maxRank":3},{"id":115,"icon":[8000001],"q":1,"x":123.0,"y":552.0,"act":[57003,332005,56003],"ranks":[{"r":1,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +0.5%","attr":[{"type":191,"value":50}]},{"r":2,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1%","attr":[{"type":191,"value":100}]},{"r":3,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1.5%","attr":[{"type":191,"value":150}]}],"maxRank":3},{"id":116,"icon":[8000001],"q":1,"x":363.0,"y":300.0,"act":[541007,199003,184003],"ranks":[{"r":1,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +0.5%","attr":[{"type":191,"value":50}]},{"r":2,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1%","attr":[{"type":191,"value":100}]},{"r":3,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1.5%","attr":[{"type":191,"value":150}]}],"maxRank":3},{"id":117,"icon":[8000001],"q":1,"x":63.0,"y":258.0,"act":[198003,186003],"ranks":[{"r":1,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +0.5%","attr":[{"type":191,"value":50}]},{"r":2,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1%","attr":[{"type":191,"value":100}]},{"r":3,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1.5%","attr":[{"type":191,"value":150}]}],"maxRank":3},{"id":118,"icon":[8000001],"q":1,"x":183.0,"y":174.0,"act":[189003,76003],"ranks":[{"r":1,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +0.5%","attr":[{"type":191,"value":50}]},{"r":2,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1%","attr":[{"type":191,"value":100}]},{"r":3,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1.5%","attr":[{"type":191,"value":150}]}],"maxRank":3},{"id":119,"icon":[8000001],"q":1,"x":243.0,"y":426.0,"act":[179003,73003],"ranks":[{"r":1,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +0.5%","attr":[{"type":191,"value":50}]},{"r":2,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1%","attr":[{"type":191,"value":100}]},{"r":3,"name":["Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down","Taoist DMG Down"],"desc":null,"stat":"Taoist DMG Down +1.5%","attr":[{"type":191,"value":150}]}],"maxRank":3},{"id":121,"icon":[8000000],"q":1,"x":603.0,"y":972.0,"act":[16003,208003],"ranks":[{"r":1,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +0.5%","attr":[{"type":192,"value":50}]},{"r":2,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1%","attr":[{"type":192,"value":100}]},{"r":3,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1.5%","attr":[{"type":192,"value":150}]}],"maxRank":3},{"id":122,"icon":[8000000],"q":1,"x":603.0,"y":1098.0,"act":[97003,137003],"ranks":[{"r":1,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +0.5%","attr":[{"type":192,"value":50}]},{"r":2,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1%","attr":[{"type":192,"value":100}]},{"r":3,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1.5%","attr":[{"type":192,"value":150}]}],"maxRank":3},{"id":123,"icon":[8000000],"q":1,"x":243.0,"y":762.0,"act":[141003,4003],"ranks":[{"r":1,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +0.5%","attr":[{"type":192,"value":50}]},{"r":2,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1%","attr":[{"type":192,"value":100}]},{"r":3,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1.5%","attr":[{"type":192,"value":150}]}],"maxRank":3},{"id":124,"icon":[8000000],"q":1,"x":483.0,"y":846.0,"act":[3003,138003],"ranks":[{"r":1,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +0.5%","attr":[{"type":192,"value":50}]},{"r":2,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1%","attr":[{"type":192,"value":100}]},{"r":3,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1.5%","attr":[{"type":192,"value":150}]}],"maxRank":3},{"id":125,"icon":[8000000],"q":1,"x":123.0,"y":888.0,"act":[31003,191003,531007,32003],"ranks":[{"r":1,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +0.5%","attr":[{"type":192,"value":50}]},{"r":2,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1%","attr":[{"type":192,"value":100}]},{"r":3,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1.5%","attr":[{"type":192,"value":150}]}],"maxRank":3},{"id":126,"icon":[8000000],"q":1,"x":243.0,"y":930.0,"act":[143003,142003,33003],"ranks":[{"r":1,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +0.5%","attr":[{"type":192,"value":50}]},{"r":2,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1%","attr":[{"type":192,"value":100}]},{"r":3,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1.5%","attr":[{"type":192,"value":150}]}],"maxRank":3},{"id":127,"icon":[8000000],"q":1,"x":243.0,"y":1014.0,"act":[34003,146003],"ranks":[{"r":1,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +0.5%","attr":[{"type":192,"value":50}]},{"r":2,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1%","attr":[{"type":192,"value":100}]},{"r":3,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1.5%","attr":[{"type":192,"value":150}]}],"maxRank":3},{"id":128,"icon":[8000000],"q":1,"x":123.0,"y":1098.0,"act":[147003,37003],"ranks":[{"r":1,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +0.5%","attr":[{"type":192,"value":50}]},{"r":2,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1%","attr":[{"type":192,"value":100}]},{"r":3,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1.5%","attr":[{"type":192,"value":150}]}],"maxRank":3},{"id":129,"icon":[8000000],"q":1,"x":243.0,"y":1140.0,"act":[36003,7003],"ranks":[{"r":1,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +0.5%","attr":[{"type":192,"value":50}]},{"r":2,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1%","attr":[{"type":192,"value":100}]},{"r":3,"name":["DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior","DMG Up vs Warrior"],"desc":null,"stat":"DMG Up vs Warrior +1.5%","attr":[{"type":192,"value":150}]}],"maxRank":3},{"id":131,"icon":[8000000],"q":1,"x":843.0,"y":468.0,"act":[330005,151003,62003],"ranks":[{"r":1,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +0.5%","attr":[{"type":193,"value":50}]},{"r":2,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1%","attr":[{"type":193,"value":100}]},{"r":3,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1.5%","attr":[{"type":193,"value":150}]}],"maxRank":3},{"id":132,"icon":[8000000],"q":1,"x":1023.0,"y":594.0,"act":[202003,156003,42003,320005],"ranks":[{"r":1,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +0.5%","attr":[{"type":193,"value":50}]},{"r":2,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1%","attr":[{"type":193,"value":100}]},{"r":3,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1.5%","attr":[{"type":193,"value":150}]}],"maxRank":3},{"id":133,"icon":[8000000],"q":1,"x":663.0,"y":804.0,"act":[12003,81003,13003,106003],"ranks":[{"r":1,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +0.5%","attr":[{"type":193,"value":50}]},{"r":2,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1%","attr":[{"type":193,"value":100}]},{"r":3,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1.5%","attr":[{"type":193,"value":150}]}],"maxRank":3},{"id":134,"icon":[8000000],"q":1,"x":783.0,"y":972.0,"act":[24003,501007,207003],"ranks":[{"r":1,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +0.5%","attr":[{"type":193,"value":50}]},{"r":2,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1%","attr":[{"type":193,"value":100}]},{"r":3,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1.5%","attr":[{"type":193,"value":150}]}],"maxRank":3},{"id":135,"icon":[8000000],"q":1,"x":1023.0,"y":1140.0,"act":[550007,109003],"ranks":[{"r":1,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +0.5%","attr":[{"type":193,"value":50}]},{"r":2,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1%","attr":[{"type":193,"value":100}]},{"r":3,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1.5%","attr":[{"type":193,"value":150}]}],"maxRank":3},{"id":136,"icon":[8000000],"q":1,"x":723.0,"y":1140.0,"act":[28003,137003],"ranks":[{"r":1,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +0.5%","attr":[{"type":193,"value":50}]},{"r":2,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1%","attr":[{"type":193,"value":100}]},{"r":3,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1.5%","attr":[{"type":193,"value":150}]}],"maxRank":3},{"id":137,"icon":[8000000],"q":1,"x":603.0,"y":1140.0,"act":[310005,122003,136003],"ranks":[{"r":1,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +0.5%","attr":[{"type":193,"value":50}]},{"r":2,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1%","attr":[{"type":193,"value":100}]},{"r":3,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1.5%","attr":[{"type":193,"value":150}]}],"maxRank":3},{"id":138,"icon":[8000000],"q":1,"x":483.0,"y":930.0,"act":[124003,84003],"ranks":[{"r":1,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +0.5%","attr":[{"type":193,"value":50}]},{"r":2,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1%","attr":[{"type":193,"value":100}]},{"r":3,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1.5%","attr":[{"type":193,"value":150}]}],"maxRank":3},{"id":139,"icon":[8000000],"q":1,"x":543.0,"y":1014.0,"act":[84003,561007,86003],"ranks":[{"r":1,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +0.5%","attr":[{"type":193,"value":50}]},{"r":2,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1%","attr":[{"type":193,"value":100}]},{"r":3,"name":["DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage","DMG Up vs Mage"],"desc":null,"stat":"DMG Up vs Mage +1.5%","attr":[{"type":193,"value":150}]}],"maxRank":3},{"id":141,"icon":[8000000],"q":1,"x":303.0,"y":762.0,"act":[52003,123003],"ranks":[{"r":1,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +0.5%","attr":[{"type":194,"value":50}]},{"r":2,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1%","attr":[{"type":194,"value":100}]},{"r":3,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1.5%","attr":[{"type":194,"value":150}]}],"maxRank":3},{"id":142,"icon":[8000000],"q":1,"x":303.0,"y":888.0,"act":[83003,94003,126003,33003],"ranks":[{"r":1,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +0.5%","attr":[{"type":194,"value":50}]},{"r":2,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1%","attr":[{"type":194,"value":100}]},{"r":3,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1.5%","attr":[{"type":194,"value":150}]}],"maxRank":3},{"id":143,"icon":[8000000],"q":1,"x":243.0,"y":888.0,"act":[32003,126003],"ranks":[{"r":1,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +0.5%","attr":[{"type":194,"value":50}]},{"r":2,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1%","attr":[{"type":194,"value":100}]},{"r":3,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1.5%","attr":[{"type":194,"value":150}]}],"maxRank":3},{"id":144,"icon":[8000000],"q":1,"x":123.0,"y":972.0,"act":[145003,34003],"ranks":[{"r":1,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +0.5%","attr":[{"type":194,"value":50}]},{"r":2,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1%","attr":[{"type":194,"value":100}]},{"r":3,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1.5%","attr":[{"type":194,"value":150}]}],"maxRank":3},{"id":145,"icon":[8000000],"q":1,"x":63.0,"y":972.0,"act":[35003,144003],"ranks":[{"r":1,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +0.5%","attr":[{"type":194,"value":50}]},{"r":2,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1%","attr":[{"type":194,"value":100}]},{"r":3,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1.5%","attr":[{"type":194,"value":150}]}],"maxRank":3},{"id":146,"icon":[8000000],"q":1,"x":243.0,"y":1056.0,"act":[127003,113003,36003],"ranks":[{"r":1,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +0.5%","attr":[{"type":194,"value":50}]},{"r":2,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1%","attr":[{"type":194,"value":100}]},{"r":3,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1.5%","attr":[{"type":194,"value":150}]}],"maxRank":3},{"id":147,"icon":[8000000],"q":1,"x":123.0,"y":1056.0,"act":[35003,128003,113003],"ranks":[{"r":1,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +0.5%","attr":[{"type":194,"value":50}]},{"r":2,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1%","attr":[{"type":194,"value":100}]},{"r":3,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1.5%","attr":[{"type":194,"value":150}]}],"maxRank":3},{"id":148,"icon":[8000000],"q":1,"x":423.0,"y":1098.0,"act":[96003,88003,87003],"ranks":[{"r":1,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +0.5%","attr":[{"type":194,"value":50}]},{"r":2,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1%","attr":[{"type":194,"value":100}]},{"r":3,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1.5%","attr":[{"type":194,"value":150}]}],"maxRank":3},{"id":149,"icon":[8000000],"q":1,"x":123.0,"y":720.0,"act":[39003,341005,51003,31003],"ranks":[{"r":1,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +0.5%","attr":[{"type":194,"value":50}]},{"r":2,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1%","attr":[{"type":194,"value":100}]},{"r":3,"name":["DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist","DMG Up vs Taoist"],"desc":null,"stat":"DMG Up vs Taoist +1.5%","attr":[{"type":194,"value":150}]}],"maxRank":3},{"id":151,"icon":[8000000],"q":1,"x":783.0,"y":468.0,"act":[201003,131003,522007],"ranks":[{"r":1,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +50","attr":[{"type":17,"value":50}]},{"r":2,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +100","attr":[{"type":17,"value":100}]},{"r":3,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +150","attr":[{"type":17,"value":150}]}],"maxRank":3},{"id":152,"icon":[8000000],"q":1,"x":783.0,"y":384.0,"act":[68003,65003,64003],"ranks":[{"r":1,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +50","attr":[{"type":17,"value":50}]},{"r":2,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +100","attr":[{"type":17,"value":100}]},{"r":3,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +150","attr":[{"type":17,"value":150}]}],"maxRank":3},{"id":153,"icon":[8000000],"q":1,"x":1023.0,"y":426.0,"act":[66003,390005,202003],"ranks":[{"r":1,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +50","attr":[{"type":17,"value":50}]},{"r":2,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +100","attr":[{"type":17,"value":100}]},{"r":3,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +150","attr":[{"type":17,"value":150}]}],"maxRank":3},{"id":154,"icon":[8000000],"q":1,"x":843.0,"y":174.0,"act":[99003,67003],"ranks":[{"r":1,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +50","attr":[{"type":17,"value":50}]},{"r":2,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +100","attr":[{"type":17,"value":100}]},{"r":3,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +150","attr":[{"type":17,"value":150}]}],"maxRank":3},{"id":155,"icon":[8000000],"q":1,"x":963.0,"y":174.0,"act":[164003,520007],"ranks":[{"r":1,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +50","attr":[{"type":17,"value":50}]},{"r":2,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +100","attr":[{"type":17,"value":100}]},{"r":3,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +150","attr":[{"type":17,"value":150}]}],"maxRank":3},{"id":156,"icon":[8000000],"q":1,"x":963.0,"y":552.0,"act":[202003,132003,42003],"ranks":[{"r":1,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +50","attr":[{"type":17,"value":50}]},{"r":2,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +100","attr":[{"type":17,"value":100}]},{"r":3,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +150","attr":[{"type":17,"value":150}]}],"maxRank":3},{"id":157,"icon":[8000000],"q":1,"x":543.0,"y":384.0,"act":[381005,182003,166003],"ranks":[{"r":1,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +50","attr":[{"type":17,"value":50}]},{"r":2,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +100","attr":[{"type":17,"value":100}]},{"r":3,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +150","attr":[{"type":17,"value":150}]}],"maxRank":3},{"id":158,"icon":[8000000],"q":1,"x":543.0,"y":258.0,"act":[79003,168003,178003],"ranks":[{"r":1,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +50","attr":[{"type":17,"value":50}]},{"r":2,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +100","attr":[{"type":17,"value":100}]},{"r":3,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +150","attr":[{"type":17,"value":150}]}],"maxRank":3},{"id":159,"icon":[8000000],"q":1,"x":663.0,"y":216.0,"act":[168003,169003,188003],"ranks":[{"r":1,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +50","attr":[{"type":17,"value":50}]},{"r":2,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +100","attr":[{"type":17,"value":100}]},{"r":3,"name":["Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up","Crit DMG Up"],"desc":null,"stat":"Crit DMG Up +150","attr":[{"type":17,"value":150}]}],"maxRank":3},{"id":161,"icon":[8000001],"q":1,"x":963.0,"y":384.0,"act":[101003,63003,65003],"ranks":[{"r":1,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +50","attr":[{"type":78,"value":50}]},{"r":2,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +100","attr":[{"type":78,"value":100}]},{"r":3,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +150","attr":[{"type":78,"value":150}]}],"maxRank":3},{"id":162,"icon":[8000001],"q":1,"x":903.0,"y":300.0,"act":[521007,101003,66003],"ranks":[{"r":1,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +50","attr":[{"type":78,"value":50}]},{"r":2,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +100","attr":[{"type":78,"value":100}]},{"r":3,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +150","attr":[{"type":78,"value":150}]}],"maxRank":3},{"id":163,"icon":[8000001],"q":1,"x":963.0,"y":258.0,"act":[67003,350005,66003],"ranks":[{"r":1,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +50","attr":[{"type":78,"value":50}]},{"r":2,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +100","attr":[{"type":78,"value":100}]},{"r":3,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +150","attr":[{"type":78,"value":150}]}],"maxRank":3},{"id":164,"icon":[8000001],"q":1,"x":903.0,"y":132.0,"act":[67003,155003],"ranks":[{"r":1,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +50","attr":[{"type":78,"value":50}]},{"r":2,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +100","attr":[{"type":78,"value":100}]},{"r":3,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +150","attr":[{"type":78,"value":150}]}],"maxRank":3},{"id":165,"icon":[8000001],"q":1,"x":603.0,"y":468.0,"act":[182003,361005,69003],"ranks":[{"r":1,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +50","attr":[{"type":78,"value":50}]},{"r":2,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +100","attr":[{"type":78,"value":100}]},{"r":3,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +150","attr":[{"type":78,"value":150}]}],"maxRank":3},{"id":166,"icon":[8000001],"q":1,"x":663.0,"y":384.0,"act":[8003,157003,542007],"ranks":[{"r":1,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +50","attr":[{"type":78,"value":50}]},{"r":2,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +100","attr":[{"type":78,"value":100}]},{"r":3,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +150","attr":[{"type":78,"value":150}]}],"maxRank":3},{"id":167,"icon":[8000001],"q":1,"x":663.0,"y":300.0,"act":[187003,401005],"ranks":[{"r":1,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +50","attr":[{"type":78,"value":50}]},{"r":2,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +100","attr":[{"type":78,"value":100}]},{"r":3,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +150","attr":[{"type":78,"value":150}]}],"maxRank":3},{"id":168,"icon":[8000001],"q":1,"x":603.0,"y":216.0,"act":[79003,158003,159003],"ranks":[{"r":1,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +50","attr":[{"type":78,"value":50}]},{"r":2,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +100","attr":[{"type":78,"value":100}]},{"r":3,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +150","attr":[{"type":78,"value":150}]}],"maxRank":3},{"id":169,"icon":[8000001],"q":1,"x":663.0,"y":132.0,"act":[312005,159003],"ranks":[{"r":1,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +50","attr":[{"type":78,"value":50}]},{"r":2,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +100","attr":[{"type":78,"value":100}]},{"r":3,"name":["Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down","Crit DMG Down"],"desc":null,"stat":"Crit DMG Down +150","attr":[{"type":78,"value":150}]}],"maxRank":3},{"id":171,"icon":[8000002],"q":1,"x":303.0,"y":678.0,"act":[402005,52003],"ranks":[{"r":1,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +0.5%","attr":[{"type":68,"value":50}]},{"r":2,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1%","attr":[{"type":68,"value":100}]},{"r":3,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1.5%","attr":[{"type":68,"value":150}]}],"maxRank":3},{"id":172,"icon":[8000002],"q":1,"x":63.0,"y":468.0,"act":[311005,194003],"ranks":[{"r":1,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +0.5%","attr":[{"type":68,"value":50}]},{"r":2,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1%","attr":[{"type":68,"value":100}]},{"r":3,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1.5%","attr":[{"type":68,"value":150}]}],"maxRank":3},{"id":173,"icon":[8000002],"q":1,"x":423.0,"y":426.0,"act":[197003,195003,74003,17003],"ranks":[{"r":1,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +0.5%","attr":[{"type":68,"value":50}]},{"r":2,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1%","attr":[{"type":68,"value":100}]},{"r":3,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1.5%","attr":[{"type":68,"value":150}]}],"maxRank":3},{"id":174,"icon":[8000002],"q":1,"x":243.0,"y":258.0,"act":[392005,175003],"ranks":[{"r":1,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +0.5%","attr":[{"type":68,"value":50}]},{"r":2,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1%","attr":[{"type":68,"value":100}]},{"r":3,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1.5%","attr":[{"type":68,"value":150}]}],"maxRank":3},{"id":175,"icon":[8000002],"q":1,"x":303.0,"y":216.0,"act":[189003,174003],"ranks":[{"r":1,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +0.5%","attr":[{"type":68,"value":50}]},{"r":2,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1%","attr":[{"type":68,"value":100}]},{"r":3,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1.5%","attr":[{"type":68,"value":150}]}],"maxRank":3},{"id":176,"icon":[8000002],"q":1,"x":123.0,"y":132.0,"act":[510007,78003],"ranks":[{"r":1,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +0.5%","attr":[{"type":68,"value":50}]},{"r":2,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1%","attr":[{"type":68,"value":100}]},{"r":3,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1.5%","attr":[{"type":68,"value":150}]}],"maxRank":3},{"id":177,"icon":[8000002],"q":1,"x":423.0,"y":132.0,"act":[540007,185003,189003],"ranks":[{"r":1,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +0.5%","attr":[{"type":68,"value":50}]},{"r":2,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1%","attr":[{"type":68,"value":100}]},{"r":3,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1.5%","attr":[{"type":68,"value":150}]}],"maxRank":3},{"id":178,"icon":[8000002],"q":1,"x":543.0,"y":300.0,"act":[158003,77003,401005,8003],"ranks":[{"r":1,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +0.5%","attr":[{"type":68,"value":50}]},{"r":2,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1%","attr":[{"type":68,"value":100}]},{"r":3,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1.5%","attr":[{"type":68,"value":150}]}],"maxRank":3},{"id":179,"icon":[8000002],"q":1,"x":183.0,"y":426.0,"act":[59003,119003],"ranks":[{"r":1,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +0.5%","attr":[{"type":68,"value":50}]},{"r":2,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1%","attr":[{"type":68,"value":100}]},{"r":3,"name":["Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up","Fatal DMG Up"],"desc":null,"stat":"Fatal DMG Up +1.5%","attr":[{"type":68,"value":150}]}],"maxRank":3},{"id":181,"icon":[8000002],"q":1,"x":483.0,"y":510.0,"act":[74003,361005],"ranks":[{"r":1,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +0.5%","attr":[{"type":69,"value":50}]},{"r":2,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1%","attr":[{"type":69,"value":100}]},{"r":3,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1.5%","attr":[{"type":69,"value":150}]}],"maxRank":3},{"id":182,"icon":[8000002],"q":1,"x":603.0,"y":426.0,"act":[157003,165003],"ranks":[{"r":1,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +0.5%","attr":[{"type":69,"value":50}]},{"r":2,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1%","attr":[{"type":69,"value":100}]},{"r":3,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1.5%","attr":[{"type":69,"value":150}]}],"maxRank":3},{"id":183,"icon":[8000002],"q":1,"x":123.0,"y":342.0,"act":[322005,59003,511007],"ranks":[{"r":1,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +0.5%","attr":[{"type":69,"value":50}]},{"r":2,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1%","attr":[{"type":69,"value":100}]},{"r":3,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1.5%","attr":[{"type":69,"value":150}]}],"maxRank":3},{"id":184,"icon":[8000002],"q":1,"x":363.0,"y":342.0,"act":[116003,302005],"ranks":[{"r":1,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +0.5%","attr":[{"type":69,"value":50}]},{"r":2,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1%","attr":[{"type":69,"value":100}]},{"r":3,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1.5%","attr":[{"type":69,"value":150}]}],"maxRank":3},{"id":185,"icon":[8000002],"q":1,"x":483.0,"y":132.0,"act":[177003,342005,79003],"ranks":[{"r":1,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +0.5%","attr":[{"type":69,"value":50}]},{"r":2,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1%","attr":[{"type":69,"value":100}]},{"r":3,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1.5%","attr":[{"type":69,"value":150}]}],"maxRank":3},{"id":186,"icon":[8000002],"q":1,"x":123.0,"y":258.0,"act":[78003,117003],"ranks":[{"r":1,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +0.5%","attr":[{"type":69,"value":50}]},{"r":2,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1%","attr":[{"type":69,"value":100}]},{"r":3,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1.5%","attr":[{"type":69,"value":150}]}],"maxRank":3},{"id":187,"icon":[8000002],"q":1,"x":663.0,"y":258.0,"act":[167003,9003],"ranks":[{"r":1,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +0.5%","attr":[{"type":69,"value":50}]},{"r":2,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1%","attr":[{"type":69,"value":100}]},{"r":3,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1.5%","attr":[{"type":69,"value":150}]}],"maxRank":3},{"id":188,"icon":[8000002],"q":1,"x":723.0,"y":216.0,"act":[99003,159003,9003],"ranks":[{"r":1,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +0.5%","attr":[{"type":69,"value":50}]},{"r":2,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1%","attr":[{"type":69,"value":100}]},{"r":3,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1.5%","attr":[{"type":69,"value":150}]}],"maxRank":3},{"id":189,"icon":[8000002],"q":1,"x":303.0,"y":174.0,"act":[177003,352005,118003,175003],"ranks":[{"r":1,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +0.5%","attr":[{"type":69,"value":50}]},{"r":2,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1%","attr":[{"type":69,"value":100}]},{"r":3,"name":["Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down","Fatal DMG Down"],"desc":null,"stat":"Fatal DMG Down +1.5%","attr":[{"type":69,"value":150}]}],"maxRank":3},{"id":191,"icon":[8000002],"q":1,"x":63.0,"y":888.0,"act":[321005,125003],"ranks":[{"r":1,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.3%","attr":[{"type":220,"value":30}]},{"r":2,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.6%","attr":[{"type":220,"value":60}]},{"r":3,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.9%","attr":[{"type":220,"value":90}]}],"maxRank":3},{"id":192,"icon":[8000002],"q":1,"x":183.0,"y":678.0,"act":[54003,39003,532007],"ranks":[{"r":1,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.3%","attr":[{"type":220,"value":30}]},{"r":2,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.6%","attr":[{"type":220,"value":60}]},{"r":3,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.9%","attr":[{"type":220,"value":90}]}],"maxRank":3},{"id":193,"icon":[8000002],"q":1,"x":243.0,"y":594.0,"act":[56003,382005,114003],"ranks":[{"r":1,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.3%","attr":[{"type":220,"value":30}]},{"r":2,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.6%","attr":[{"type":220,"value":60}]},{"r":3,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.9%","attr":[{"type":220,"value":90}]}],"maxRank":3},{"id":194,"icon":[8000002],"q":1,"x":123.0,"y":510.0,"act":[58003,172003],"ranks":[{"r":1,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.3%","attr":[{"type":220,"value":30}]},{"r":2,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.6%","attr":[{"type":220,"value":60}]},{"r":3,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.9%","attr":[{"type":220,"value":90}]}],"maxRank":3},{"id":195,"icon":[8000002],"q":1,"x":363.0,"y":468.0,"act":[18003,73003,17003,74003,173003],"ranks":[{"r":1,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.3%","attr":[{"type":220,"value":30}]},{"r":2,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.6%","attr":[{"type":220,"value":60}]},{"r":3,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.9%","attr":[{"type":220,"value":90}]}],"maxRank":3},{"id":196,"icon":[8000002],"q":1,"x":63.0,"y":384.0,"act":[198003,75003],"ranks":[{"r":1,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.3%","attr":[{"type":220,"value":30}]},{"r":2,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.6%","attr":[{"type":220,"value":60}]},{"r":3,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.9%","attr":[{"type":220,"value":90}]}],"maxRank":3},{"id":197,"icon":[8000002],"q":1,"x":423.0,"y":384.0,"act":[302005,173003,381005],"ranks":[{"r":1,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.3%","attr":[{"type":220,"value":30}]},{"r":2,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.6%","attr":[{"type":220,"value":60}]},{"r":3,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.9%","attr":[{"type":220,"value":90}]}],"maxRank":3},{"id":198,"icon":[8000002],"q":1,"x":63.0,"y":300.0,"act":[117003,322005,196003],"ranks":[{"r":1,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.3%","attr":[{"type":220,"value":30}]},{"r":2,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.6%","attr":[{"type":220,"value":60}]},{"r":3,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.9%","attr":[{"type":220,"value":90}]}],"maxRank":3},{"id":199,"icon":[8000002],"q":1,"x":303.0,"y":300.0,"act":[76003,116003],"ranks":[{"r":1,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.3%","attr":[{"type":220,"value":30}]},{"r":2,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.6%","attr":[{"type":220,"value":60}]},{"r":3,"name":["Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus","Lucky Damage Bonus"],"desc":null,"stat":"Lucky Damage Bonus +0.9%","attr":[{"type":220,"value":90}]}],"maxRank":3},{"id":201,"icon":[8000002],"q":1,"x":723.0,"y":468.0,"act":[64003,151003],"ranks":[{"r":1,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.3%","attr":[{"type":221,"value":30}]},{"r":2,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.6%","attr":[{"type":221,"value":60}]},{"r":3,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.9%","attr":[{"type":221,"value":90}]}],"maxRank":3},{"id":202,"icon":[8000002],"q":1,"x":1023.0,"y":510.0,"act":[153003,390005,156003,132003],"ranks":[{"r":1,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.3%","attr":[{"type":221,"value":30}]},{"r":2,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.6%","attr":[{"type":221,"value":60}]},{"r":3,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.9%","attr":[{"type":221,"value":90}]}],"maxRank":3},{"id":203,"icon":[8000002],"q":1,"x":963.0,"y":720.0,"act":[21003,320005,48003],"ranks":[{"r":1,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.3%","attr":[{"type":221,"value":30}]},{"r":2,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.6%","attr":[{"type":221,"value":60}]},{"r":3,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.9%","attr":[{"type":221,"value":90}]}],"maxRank":3},{"id":204,"icon":[8000002],"q":1,"x":783.0,"y":720.0,"act":[22003,44003],"ranks":[{"r":1,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.3%","attr":[{"type":221,"value":30}]},{"r":2,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.6%","attr":[{"type":221,"value":60}]},{"r":3,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.9%","attr":[{"type":221,"value":90}]}],"maxRank":3},{"id":205,"icon":[8000002],"q":1,"x":843.0,"y":888.0,"act":[91003,14003],"ranks":[{"r":1,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.3%","attr":[{"type":221,"value":30}]},{"r":2,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.6%","attr":[{"type":221,"value":60}]},{"r":3,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.9%","attr":[{"type":221,"value":90}]}],"maxRank":3},{"id":206,"icon":[8000002],"q":1,"x":1023.0,"y":930.0,"act":[105003,25003],"ranks":[{"r":1,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.3%","attr":[{"type":221,"value":30}]},{"r":2,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.6%","attr":[{"type":221,"value":60}]},{"r":3,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.9%","attr":[{"type":221,"value":90}]}],"maxRank":3},{"id":207,"icon":[8000002],"q":1,"x":843.0,"y":972.0,"act":[134003,107003,362005],"ranks":[{"r":1,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.3%","attr":[{"type":221,"value":30}]},{"r":2,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.6%","attr":[{"type":221,"value":60}]},{"r":3,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.9%","attr":[{"type":221,"value":90}]}],"maxRank":3},{"id":208,"icon":[8000002],"q":1,"x":663.0,"y":1014.0,"act":[121003,360005,27003],"ranks":[{"r":1,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.3%","attr":[{"type":221,"value":30}]},{"r":2,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.6%","attr":[{"type":221,"value":60}]},{"r":3,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.9%","attr":[{"type":221,"value":90}]}],"maxRank":3},{"id":209,"icon":[8000002],"q":1,"x":843.0,"y":1056.0,"act":[108003,371005],"ranks":[{"r":1,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.3%","attr":[{"type":221,"value":30}]},{"r":2,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.6%","attr":[{"type":221,"value":60}]},{"r":3,"name":["Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction","Lucky Damage Reduction"],"desc":null,"stat":"Lucky Damage Reduction +0.9%","attr":[{"type":221,"value":90}]}],"maxRank":3},{"id":300,"icon":[8000008],"q":2,"x":903.0,"y":594.0,"act":[41003,62003,11003],"ranks":[{"r":1,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +0.4%","attr":[{"type":11,"value":40}]},{"r":2,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +0.8%","attr":[{"type":11,"value":80}]},{"r":3,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +1.2%","attr":[{"type":11,"value":120}]},{"r":4,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +1.6%","attr":[{"type":11,"value":160}]},{"r":5,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +2%","attr":[{"type":11,"value":200}]}],"maxRank":5},{"id":301,"icon":[8000008],"q":2,"x":363.0,"y":804.0,"act":[93003],"ranks":[{"r":1,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +0.4%","attr":[{"type":11,"value":40}]},{"r":2,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +0.8%","attr":[{"type":11,"value":80}]},{"r":3,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +1.2%","attr":[{"type":11,"value":120}]},{"r":4,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +1.6%","attr":[{"type":11,"value":160}]},{"r":5,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +2%","attr":[{"type":11,"value":200}]}],"maxRank":5},{"id":302,"icon":[8000008],"q":2,"x":363.0,"y":384.0,"act":[18003,184003,197003],"ranks":[{"r":1,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +0.4%","attr":[{"type":11,"value":40}]},{"r":2,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +0.8%","attr":[{"type":11,"value":80}]},{"r":3,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +1.2%","attr":[{"type":11,"value":120}]},{"r":4,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +1.6%","attr":[{"type":11,"value":160}]},{"r":5,"name":["HP AMP","HP AMP","HP AMP","HP AMP","HP AMP"],"desc":null,"stat":"HP AMP +2%","attr":[{"type":11,"value":200}]}],"maxRank":5},{"id":310,"icon":[8000006],"q":2,"x":543.0,"y":1140.0,"act":[137003],"ranks":[{"r":1,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +0.2%","attr":[{"type":12,"value":20}]},{"r":2,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +0.4%","attr":[{"type":12,"value":40}]},{"r":3,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +0.6%","attr":[{"type":12,"value":60}]},{"r":4,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +0.8%","attr":[{"type":12,"value":80}]},{"r":5,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +1%","attr":[{"type":12,"value":100}]}],"maxRank":5},{"id":311,"icon":[8000006],"q":2,"x":63.0,"y":426.0,"act":[172003],"ranks":[{"r":1,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +0.2%","attr":[{"type":12,"value":20}]},{"r":2,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +0.4%","attr":[{"type":12,"value":40}]},{"r":3,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +0.6%","attr":[{"type":12,"value":60}]},{"r":4,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +0.8%","attr":[{"type":12,"value":80}]},{"r":5,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +1%","attr":[{"type":12,"value":100}]}],"maxRank":5},{"id":312,"icon":[8000006],"q":2,"x":783.0,"y":132.0,"act":[169003],"ranks":[{"r":1,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +0.2%","attr":[{"type":12,"value":20}]},{"r":2,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +0.4%","attr":[{"type":12,"value":40}]},{"r":3,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +0.6%","attr":[{"type":12,"value":60}]},{"r":4,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +0.8%","attr":[{"type":12,"value":80}]},{"r":5,"name":["ATK AMP","ATK AMP","ATK AMP","ATK AMP","ATK AMP"],"desc":null,"stat":"ATK AMP +1%","attr":[{"type":12,"value":100}]}],"maxRank":5},{"id":320,"icon":[8000007],"q":2,"x":1023.0,"y":678.0,"act":[132003,203003],"ranks":[{"r":1,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +0.4%","attr":[{"type":196,"value":40}]},{"r":2,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +0.8%","attr":[{"type":196,"value":80}]},{"r":3,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +1.2%","attr":[{"type":196,"value":120}]},{"r":4,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +1.6%","attr":[{"type":196,"value":160}]},{"r":5,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +2%","attr":[{"type":196,"value":200}]}],"maxRank":5},{"id":321,"icon":[8000007],"q":2,"x":63.0,"y":846.0,"act":[111003,191003],"ranks":[{"r":1,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +0.4%","attr":[{"type":196,"value":40}]},{"r":2,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +0.8%","attr":[{"type":196,"value":80}]},{"r":3,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +1.2%","attr":[{"type":196,"value":120}]},{"r":4,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +1.6%","attr":[{"type":196,"value":160}]},{"r":5,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +2%","attr":[{"type":196,"value":200}]}],"maxRank":5},{"id":322,"icon":[8000007],"q":2,"x":123.0,"y":300.0,"act":[198003,183003],"ranks":[{"r":1,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +0.4%","attr":[{"type":196,"value":40}]},{"r":2,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +0.8%","attr":[{"type":196,"value":80}]},{"r":3,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +1.2%","attr":[{"type":196,"value":120}]},{"r":4,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +1.6%","attr":[{"type":196,"value":160}]},{"r":5,"name":["DEF AMP","DEF AMP","DEF AMP","DEF AMP","DEF AMP"],"desc":null,"stat":"DEF AMP +2%","attr":[{"type":196,"value":200}]}],"maxRank":5},{"id":330,"icon":[8000008],"q":2,"x":843.0,"y":426.0,"act":[65003,131003],"ranks":[{"r":1,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +0.5%","attr":[{"type":153,"value":50}]},{"r":2,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +1%","attr":[{"type":153,"value":100}]},{"r":3,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +1.5%","attr":[{"type":153,"value":150}]},{"r":4,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +2%","attr":[{"type":153,"value":200}]},{"r":5,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +2.5%","attr":[{"type":153,"value":250}]}],"maxRank":5},{"id":331,"icon":[8000008],"q":2,"x":363.0,"y":930.0,"act":[94003,33003,95003,85003],"ranks":[{"r":1,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +0.5%","attr":[{"type":153,"value":50}]},{"r":2,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +1%","attr":[{"type":153,"value":100}]},{"r":3,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +1.5%","attr":[{"type":153,"value":150}]},{"r":4,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +2%","attr":[{"type":153,"value":200}]},{"r":5,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +2.5%","attr":[{"type":153,"value":250}]}],"maxRank":5},{"id":332,"icon":[8000008],"q":2,"x":183.0,"y":510.0,"act":[115003,56003],"ranks":[{"r":1,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +0.5%","attr":[{"type":153,"value":50}]},{"r":2,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +1%","attr":[{"type":153,"value":100}]},{"r":3,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +1.5%","attr":[{"type":153,"value":150}]},{"r":4,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +2%","attr":[{"type":153,"value":200}]},{"r":5,"name":["EVA","EVA","EVA","EVA","EVA"],"desc":null,"stat":"EVA +2.5%","attr":[{"type":153,"value":250}]}],"maxRank":5},{"id":340,"icon":[8000008],"q":2,"x":963.0,"y":804.0,"act":[103003,105003],"ranks":[{"r":1,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +0.5%","attr":[{"type":154,"value":50}]},{"r":2,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +1%","attr":[{"type":154,"value":100}]},{"r":3,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +1.5%","attr":[{"type":154,"value":150}]},{"r":4,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +2%","attr":[{"type":154,"value":200}]},{"r":5,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +2.5%","attr":[{"type":154,"value":250}]}],"maxRank":5},{"id":341,"icon":[8000008],"q":2,"x":63.0,"y":720.0,"act":[55003,149003],"ranks":[{"r":1,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +0.5%","attr":[{"type":154,"value":50}]},{"r":2,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +1%","attr":[{"type":154,"value":100}]},{"r":3,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +1.5%","attr":[{"type":154,"value":150}]},{"r":4,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +2%","attr":[{"type":154,"value":200}]},{"r":5,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +2.5%","attr":[{"type":154,"value":250}]}],"maxRank":5},{"id":342,"icon":[8000008],"q":2,"x":543.0,"y":174.0,"act":[185003,79003],"ranks":[{"r":1,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +0.5%","attr":[{"type":154,"value":50}]},{"r":2,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +1%","attr":[{"type":154,"value":100}]},{"r":3,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +1.5%","attr":[{"type":154,"value":150}]},{"r":4,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +2%","attr":[{"type":154,"value":200}]},{"r":5,"name":["ACC","ACC","ACC","ACC","ACC"],"desc":null,"stat":"ACC +2.5%","attr":[{"type":154,"value":250}]}],"maxRank":5},{"id":350,"icon":[8000008],"q":2,"x":843.0,"y":258.0,"act":[163003],"ranks":[{"r":1,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +0.5%","attr":[{"type":13,"value":50}]},{"r":2,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +1%","attr":[{"type":13,"value":100}]},{"r":3,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +1.5%","attr":[{"type":13,"value":150}]},{"r":4,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +2%","attr":[{"type":13,"value":200}]},{"r":5,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +2.5%","attr":[{"type":13,"value":250}]}],"maxRank":5},{"id":351,"icon":[8000008],"q":2,"x":183.0,"y":1014.0,"act":[34003],"ranks":[{"r":1,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +0.5%","attr":[{"type":13,"value":50}]},{"r":2,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +1%","attr":[{"type":13,"value":100}]},{"r":3,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +1.5%","attr":[{"type":13,"value":150}]},{"r":4,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +2%","attr":[{"type":13,"value":200}]},{"r":5,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +2.5%","attr":[{"type":13,"value":250}]}],"maxRank":5},{"id":352,"icon":[8000008],"q":2,"x":363.0,"y":174.0,"act":[189003],"ranks":[{"r":1,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +0.5%","attr":[{"type":13,"value":50}]},{"r":2,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +1%","attr":[{"type":13,"value":100}]},{"r":3,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +1.5%","attr":[{"type":13,"value":150}]},{"r":4,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +2%","attr":[{"type":13,"value":200}]},{"r":5,"name":["Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance","Paralysis Chance"],"desc":null,"stat":"Paralysis Chance +2.5%","attr":[{"type":13,"value":250}]}],"maxRank":5},{"id":360,"icon":[8000008],"q":2,"x":663.0,"y":972.0,"act":[208003],"ranks":[{"r":1,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +0.5%","attr":[{"type":14,"value":50}]},{"r":2,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +1%","attr":[{"type":14,"value":100}]},{"r":3,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +1.5%","attr":[{"type":14,"value":150}]},{"r":4,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +2%","attr":[{"type":14,"value":200}]},{"r":5,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +2.5%","attr":[{"type":14,"value":250}]}],"maxRank":5},{"id":361,"icon":[8000008],"q":2,"x":543.0,"y":468.0,"act":[181003,165003],"ranks":[{"r":1,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +0.5%","attr":[{"type":14,"value":50}]},{"r":2,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +1%","attr":[{"type":14,"value":100}]},{"r":3,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +1.5%","attr":[{"type":14,"value":150}]},{"r":4,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +2%","attr":[{"type":14,"value":200}]},{"r":5,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +2.5%","attr":[{"type":14,"value":250}]}],"maxRank":5},{"id":362,"icon":[8000008],"q":2,"x":903.0,"y":1014.0,"act":[207003,107003],"ranks":[{"r":1,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +0.5%","attr":[{"type":14,"value":50}]},{"r":2,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +1%","attr":[{"type":14,"value":100}]},{"r":3,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +1.5%","attr":[{"type":14,"value":150}]},{"r":4,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +2%","attr":[{"type":14,"value":200}]},{"r":5,"name":["Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES","Paralysis RES"],"desc":null,"stat":"Paralysis RES +2.5%","attr":[{"type":14,"value":250}]}],"maxRank":5},{"id":370,"icon":[8000006],"q":2,"x":723.0,"y":342.0,"act":[9003],"ranks":[{"r":1,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +0.5%","attr":[{"type":21,"value":50}]},{"r":2,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +1%","attr":[{"type":21,"value":100}]},{"r":3,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +1.5%","attr":[{"type":21,"value":150}]},{"r":4,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +2%","attr":[{"type":21,"value":200}]},{"r":5,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +2.5%","attr":[{"type":21,"value":250}]}],"maxRank":5},{"id":371,"icon":[8000006],"q":2,"x":843.0,"y":1098.0,"act":[209003,28003,26003],"ranks":[{"r":1,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +0.5%","attr":[{"type":21,"value":50}]},{"r":2,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +1%","attr":[{"type":21,"value":100}]},{"r":3,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +1.5%","attr":[{"type":21,"value":150}]},{"r":4,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +2%","attr":[{"type":21,"value":200}]},{"r":5,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +2.5%","attr":[{"type":21,"value":250}]}],"maxRank":5},{"id":372,"icon":[8000006],"q":2,"x":303.0,"y":1098.0,"act":[6003],"ranks":[{"r":1,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +0.5%","attr":[{"type":21,"value":50}]},{"r":2,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +1%","attr":[{"type":21,"value":100}]},{"r":3,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +1.5%","attr":[{"type":21,"value":150}]},{"r":4,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +2%","attr":[{"type":21,"value":200}]},{"r":5,"name":["PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up","PVP DMG Up"],"desc":null,"stat":"PVP DMG Up +2.5%","attr":[{"type":21,"value":250}]}],"maxRank":5},{"id":380,"icon":[8000007],"q":2,"x":603.0,"y":1056.0,"act":[86003],"ranks":[{"r":1,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +0.5%","attr":[{"type":22,"value":50}]},{"r":2,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +1%","attr":[{"type":22,"value":100}]},{"r":3,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +1.5%","attr":[{"type":22,"value":150}]},{"r":4,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +2%","attr":[{"type":22,"value":200}]},{"r":5,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +2.5%","attr":[{"type":22,"value":250}]}],"maxRank":5},{"id":381,"icon":[8000007],"q":2,"x":483.0,"y":384.0,"act":[19003,197003,157003],"ranks":[{"r":1,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +0.5%","attr":[{"type":22,"value":50}]},{"r":2,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +1%","attr":[{"type":22,"value":100}]},{"r":3,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +1.5%","attr":[{"type":22,"value":150}]},{"r":4,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +2%","attr":[{"type":22,"value":200}]},{"r":5,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +2.5%","attr":[{"type":22,"value":250}]}],"maxRank":5},{"id":382,"icon":[8000007],"q":2,"x":123.0,"y":594.0,"act":[193003],"ranks":[{"r":1,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +0.5%","attr":[{"type":22,"value":50}]},{"r":2,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +1%","attr":[{"type":22,"value":100}]},{"r":3,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +1.5%","attr":[{"type":22,"value":150}]},{"r":4,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +2%","attr":[{"type":22,"value":200}]},{"r":5,"name":["PVP reduction","PVP reduction","PVP reduction","PVP reduction","PVP reduction"],"desc":null,"stat":"PVP reduction +2.5%","attr":[{"type":22,"value":250}]}],"maxRank":5},{"id":390,"icon":[8000006],"q":2,"x":963.0,"y":468.0,"act":[153003,202003],"ranks":[{"r":1,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +0.3%","attr":[{"type":67,"value":30}]},{"r":2,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +0.6%","attr":[{"type":67,"value":60}]},{"r":3,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +0.9%","attr":[{"type":67,"value":90}]},{"r":4,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +1.2%","attr":[{"type":67,"value":120}]},{"r":5,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +1.5%","attr":[{"type":67,"value":150}]}],"maxRank":5},{"id":391,"icon":[8000006],"q":2,"x":543.0,"y":888.0,"act":[92003,81003,106003,16003],"ranks":[{"r":1,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +0.3%","attr":[{"type":67,"value":30}]},{"r":2,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +0.6%","attr":[{"type":67,"value":60}]},{"r":3,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +0.9%","attr":[{"type":67,"value":90}]},{"r":4,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +1.2%","attr":[{"type":67,"value":120}]},{"r":5,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +1.5%","attr":[{"type":67,"value":150}]}],"maxRank":5},{"id":392,"icon":[8000006],"q":2,"x":243.0,"y":216.0,"act":[174003],"ranks":[{"r":1,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +0.3%","attr":[{"type":67,"value":30}]},{"r":2,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +0.6%","attr":[{"type":67,"value":60}]},{"r":3,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +0.9%","attr":[{"type":67,"value":90}]},{"r":4,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +1.2%","attr":[{"type":67,"value":120}]},{"r":5,"name":["Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow","Fatal Blow"],"desc":null,"stat":"Fatal Blow +1.5%","attr":[{"type":67,"value":150}]}],"maxRank":5},{"id":400,"icon":[8000007],"q":2,"x":723.0,"y":846.0,"act":[104003],"ranks":[{"r":1,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +0.3%","attr":[{"type":205,"value":30}]},{"r":2,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +0.6%","attr":[{"type":205,"value":60}]},{"r":3,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +0.9%","attr":[{"type":205,"value":90}]},{"r":4,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +1.2%","attr":[{"type":205,"value":120}]},{"r":5,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +1.5%","attr":[{"type":205,"value":150}]}],"maxRank":5},{"id":401,"icon":[8000007],"q":2,"x":603.0,"y":300.0,"act":[178003,167003],"ranks":[{"r":1,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +0.3%","attr":[{"type":205,"value":30}]},{"r":2,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +0.6%","attr":[{"type":205,"value":60}]},{"r":3,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +0.9%","attr":[{"type":205,"value":90}]},{"r":4,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +1.2%","attr":[{"type":205,"value":120}]},{"r":5,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +1.5%","attr":[{"type":205,"value":150}]}],"maxRank":5},{"id":402,"icon":[8000007],"q":2,"x":243.0,"y":678.0,"act":[171003],"ranks":[{"r":1,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +0.3%","attr":[{"type":205,"value":30}]},{"r":2,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +0.6%","attr":[{"type":205,"value":60}]},{"r":3,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +0.9%","attr":[{"type":205,"value":90}]},{"r":4,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +1.2%","attr":[{"type":205,"value":120}]},{"r":5,"name":["Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction","Deadly reduction"],"desc":null,"stat":"Deadly reduction +1.5%","attr":[{"type":205,"value":150}]}],"maxRank":5},{"id":500,"icon":[1102000,1206000,1302000,1402000,1502000],"q":3,"x":723.0,"y":1098.0,"act":[27003],"ranks":[{"r":1,"name":["Menace Sword 1-1","Magic Mastery 1-1","Healing 1-1","Twin Blade 1-1","Precision Shot 1-1"],"desc":["Each release of the attack and kill sword technique has a 20% chance to increase attack speed by 20, lasting for 3 seconds","20% of the copied damage skill grants the target 5 seconds of Fa Huang Zhen, and an additional 6% damage is added to the target of Fa Huang Zhen during the attack","10% of the health spilled during the healing process is converted into a shield (with a maximum health limit of 50%), which lasts for 5 seconds","Each time you unleash Twin Blade, there is a 20% chance that it will increase your movement speed by 20, lasting for 3 seconds.","Each release of Precision Shot has a 20% chance of increasing Attack Speed by 20 for 3 seconds."],"stat":null,"attr":[]},{"r":2,"name":["Menace Sword 1-2","Magic Mastery 1-2","Healing 1-2","Twin Blade 1-2","Precision Shot 1-2"],"desc":["Each release of the attack and kill sword technique has a 20% chance to increase attack speed by 30 for 3 seconds","20% of the copied damage skill grants the target 5 seconds of Fa Huang Zhen, and an additional 9% damage is added to the target of Fa Huang Zhen during the attack","15% of the health spilled during the healing process is converted into a shield (with a maximum health limit of 50%), which lasts for 5 seconds","Each time you unleash Twin Blade, there is a 20% chance that it will increase your movement speed by 30, lasting for 3 seconds.","20% chance of increasing Attack Speed by 30 each time Precision Shot is released for 3 seconds."],"stat":null,"attr":[]},{"r":3,"name":["Menace Sword 1-3","Magic Mastery 1-3","Healing 1-3","Twin Blade 1-3","Precision Shot 1-3"],"desc":["There is a 20% chance to increase attack speed by 40 for 3 seconds with each release of the attack and kill sword technique","20% of the copied damage skill grants the target a 5-second Fa Huang Zhen, and an additional 12% damage is added to the Fa Huang Zhen target when attacking","20% of the health spilled during the healing process is converted into a shield (with a maximum health limit of 50%), which lasts for 5 seconds","Each time you unleash Twin Blade, there is a 20% chance that it will increase your movement speed by 40, lasting for 3 seconds.","20% chance of increasing attack speed by 40 for 3 seconds each time Precision Shot is released."],"stat":null,"attr":[]},{"r":4,"name":["Menace Sword 1-4","Magic Mastery 1-4","Healing 1-4","Twin Blade 1-4","Precision Shot 1-4"],"desc":["Each release of the attack and kill sword technique has a 20% chance to increase attack speed by 50, lasting for 3 seconds. During this period, killing a player doubles their attack speed (cannot be stacked, time refreshes)","20% of the copied damage skill grants the target a 5-second Fa Huang Zhen. When attacking, an additional 15% damage is added to the Fa Huang Zhen target, which reduces the target\'s movement speed by 20%","25% of the health spilled during the healing process is converted into a shield (with a maximum health limit of 50%), which lasts for 5 seconds. When the shield is present, the character\'s PVP damage increases by 4%","Each time you unleash Twin Blade, there is a 20% chance that it will increase your movement speed by 50, lasting for 3 seconds. During the effect, your movement speed will be doubled if you kill a player. The doubled effect can\'t be stacked, but able to reset the endurance time.","20% chance to increase Attack Speed by 50 for 3 seconds each time Precision Shot is released, during this period, Attack Speed will be doubled when killing a player (cannot be overlapped, time refresh)."],"stat":null,"attr":[]},{"r":5,"name":["Menace Sword 1-5","Magic Mastery 1-5","Healing 1-5","Twin Blade 1-5","Precision Shot 1-5"],"desc":["Each release of the attack and kill sword technique has a 20% chance to increase attack speed by 60, lasting for 3 seconds. During this period, killing a player doubles their attack speed (cannot be stacked, time refreshes)","20% of the copied damage skill grants the target a 5-second Fa Huang Zhen. When attacking, an additional 18% damage is added to the Fa Huang Zhen target, which reduces the target\'s movement speed by 20% with a 9% reduction","30% of the health spilled during the healing process is converted into a shield (with a maximum health limit of 50%), which lasts for 5 seconds. When the shield is present, the character\'s PVP damage increases by 6%","Each time you unleash Twin Blade, there is a 20% chance that it will increase your movement speed by 60, lasting for 3 seconds. During the effect, your movement speed will be doubled if you kill a player. The doubled effect can\'t be stacked, but able to reset the endurance time.","Each release of Precision Shot has a 20% chance of increasing Attack Speed by 60 for 3 seconds, during which time killing a player doubles the Attack Speed (not stackable, time to refresh)."],"stat":null,"attr":[]},{"r":6,"name":["Menace Sword 1-6","Magic Mastery 1-6","Healing 1-6","Twin Blade 1-6","Precision Shot 1-6"],"desc":["Each release of the attack and kill sword technique has a 20% chance to increase attack speed by 70, lasting for 3 seconds. During this period, killing a player doubles their attack speed (cannot be stacked, time refreshes)","20% of the copied damage skill grants the target a 5-second Fa Huang Zhen. When attacking, it inflicts an additional 21% damage on the Fa Huang Zhen target, which reduces the target\'s movement speed by 20%","35% of the health spilled during the healing process is converted into a shield (with a maximum health limit of 50%), which lasts for 5 seconds. When the shield is present, the character\'s PVP damage increases by 8%","Each time you unleash Twin Blade, there is a 20% chance that it will increase your movement speed by 70, lasting for 3 seconds. During the effect, your movement speed will be doubled if you kill a player. The doubled effect can\'t be stacked, but able to reset the endurance time.","Each release of Precision Shot has a 20% chance of increasing Attack Speed by 70 for 3 seconds, during which time killing a player doubles the Attack Speed (not stackable, time to refresh)."],"stat":null,"attr":[]},{"r":7,"name":["Menace Sword 1-7","Magic Mastery 1-7","Healing 1-7","Twin Blade 1-7","Precision Shot 1-7"],"desc":["Each release of the attack and kill sword technique has a 20% chance of increasing attack speed by 80 for 3 seconds. During this period, killing a player doubles their attack speed (non stackable, time refreshed), and restores 5% of their health to the killed player\'s bloodthirsty recovery","20% of the copied damage skill grants the target 5 seconds of Fa Huang Zhen. When attacking, an additional 24% damage is added to the target of Fa Huang Zhen. Zhen has a 15% reduction in the target\'s movement speed by 20%, and a 20% chance of doubling the attack speed by killing the Zhen player for 3 seconds","40% of the health spilled during the healing process is converted into a shield (with a maximum health limit of 50%), which lasts for 5 seconds. When the shield is present, the character\'s PVP damage is increased by 10%. When the shield is destroyed, the character\'s PVP damage is reduced by 10%","Each time you unleash Twin Blade, there is a 20% chance that it will increase your movement speed by 80, lasting for 3 seconds. During the effect, your movement speed will be doubled if you kill a player. The doubled effect can\'t be stacked, but able to reset the endurance time. Killing an enemy grants you one stack of fatal hit by 5%, 5 stacks at most.","Each Precision Shot has 20% chance to increase 80 attack speed for 3s. During the period, killing player gains extra 80 attack speed that cannot accumulate and 1 stack of buff that increases 5% damage deepening."],"stat":null,"attr":[]}],"maxRank":7},{"id":501,"icon":[1102000,1206000,1302000,1402000,1502000],"q":3,"x":783.0,"y":930.0,"act":[134003],"ranks":[{"r":1,"name":["Menace Sword 2-1","Magic Mastery 2-1","Healing 2-1","Twin Blade 2-1","Precision Shot 2-1"],"desc":["There is a 30% chance to reduce the target\'s hit rate by 4% each time the attack and kill sword technique is released, lasting for 3 seconds","Every 12 skill replicates, the next skill will cause 1 second paralysis to the target","After healing, increase movement speed by 20 for 3 seconds","Each time you use Twin Blade, there is a 30% chance that will reduce the target\'s evasion by 3% for 3 seconds.","Each precision shot has 30% chance of reducing the target\'s defense by 2% for 3 seconds."],"stat":null,"attr":[]},{"r":2,"name":["Menace Sword 2-2","Magic Mastery 2-2","Healing 2-2","Twin Blade 2-2","Precision Shot 2-2"],"desc":["There is a 30% chance to reduce the target\'s hit rate by 6% each time the attack and kill sword technique is released, lasting for 3 seconds","Every 11 skill replicates, the next skill will cause a 1-second paralysis to the target","After healing, increase movement speed by 30 for 3 seconds","Each time you use Twin Blade, there is a 30% chance that will reduce the target\'s evasion by 4.5% for 3 seconds.","Each precision shot has 30% chance of reducing the target\'s defense by 3% for 3 seconds."],"stat":null,"attr":[]},{"r":3,"name":["Menace Sword 2-3","Magic Mastery 2-3","Healing 2-3","Twin Blade 2-3","Precision Shot 2-3"],"desc":["There is a 30% chance to reduce the target\'s hit rate by 8% each time the attack and kill sword technique is released, lasting for 3 seconds","Every 10 skill replicates, the next skill will cause a 1-second paralysis to the target","After healing, increase movement speed by 40 for 3 seconds","Each time you use Twin Blade, there is a 30% chance that will reduce the target\'s evasion by 6% for 3 seconds.","Each precision shot has 30% chance of reducing the target\'s defense by 4% for 3 seconds."],"stat":null,"attr":[]},{"r":4,"name":["Menace Sword 2-4","Magic Mastery 2-4","Healing 2-4","Twin Blade 2-4","Precision Shot 2-4"],"desc":["There is a 30% chance to reduce the target\'s hit rate by 10% each time the attack and kill sword technique is released, lasting for 3 seconds","Every 9 skill replicates, the next skill will definitely cause 1 second paralysis to the target","After healing, increase movement speed by 50 for 3 seconds","Each time you use Twin Blade, there is a 30% chance that will reduce the target\'s evasion by 7.5% for 3 seconds.","Each precision shot has 30% chance of reducing the target\'s defense by 5% for 3 seconds."],"stat":null,"attr":[]},{"r":5,"name":["Menace Sword 2-5","Magic Mastery 2-5","Healing 2-5","Twin Blade 2-5","Precision Shot 2-5"],"desc":["There is a 30% chance to reduce the target\'s hit rate by 12% each time the attack and kill sword technique is released, lasting for 3 seconds","Every 8 skill replicates, the next skill will cause 1 second paralysis to the target","After healing, increase movement speed by 60 for 3 seconds","Each time you use Twin Blade, there is a 30% chance that will reduce the target\'s evasion by 9% for 3 seconds.","Each precision shot has 30% chance of reducing the target\'s defense by 6% for 3 seconds."],"stat":null,"attr":[]},{"r":6,"name":["Menace Sword 2-6","Magic Mastery 2-6","Healing 2-6","Twin Blade 2-6","Precision Shot 2-6"],"desc":["There is a 30% chance to reduce the target\'s hit rate by 14% each time the attack and kill sword technique is released, lasting for 3 seconds","Every 7 skill replicates, the next skill will cause 1 second paralysis to the target","After healing, the movement speed increases by 70 for 3 seconds","Each time you use Twin Blade, there is a 30% chance that will reduce the target\'s evasion by 10.5% for 3 seconds.","Each precision shot has 30% chance of reducing the target\'s defense by 7% for 3 seconds."],"stat":null,"attr":[]},{"r":7,"name":["Menace Sword 2-7","Magic Mastery 2-7","Healing 2-7","Twin Blade 2-7","Precision Shot 2-7"],"desc":["There is a 30% chance to reduce the target\'s hit rate by 16% each time the attack and kill sword technique is released, lasting for 3 seconds","Every 6 skill replicates, the next skill will cause 1 second paralysis to the target","After healing, the movement speed increases by 80 for 3 seconds","Each time you use Twin Blade, there is a 30% chance that will reduce the target\'s evasion by 12% for 3 seconds.","Each precision shot has 30% chance of reducing the target\'s defense by 8% for 3 seconds."],"stat":null,"attr":[]}],"maxRank":7},{"id":502,"icon":[1102000,1206000,1302000,1402000,1502000],"q":3,"x":603.0,"y":804.0,"act":[81003],"ranks":[{"r":1,"name":["Menace Sword 3-1","Magic Mastery 3-1","Healing 3-1","Twin Blade 3-1","Precision Shot 3-1"],"desc":["Attack and kill sword technique damage coefficient increased by 8%","Copy skill critical strike increases by 1%","Healing effect increased by 4%","The damage coefficient of Twin Blade is increased by 5%","Increase damage coefficient of accurate shooting by 5%"],"stat":null,"attr":[]},{"r":2,"name":["Menace Sword 3-2","Magic Mastery 3-2","Healing 3-2","Twin Blade 3-2","Precision Shot 3-2"],"desc":["Attack and kill sword technique damage coefficient increased by 12%","The critical strike of the copied skill is increased by 1.5%","Healing effect increased by 6%","The damage coefficient of Twin Blade is increased by 7.5%","Increase damage coefficient of Accurate Shot by 7.5%."],"stat":null,"attr":[]},{"r":3,"name":["Menace Sword 3-3","Magic Mastery 3-3","Healing 3-3","Twin Blade 3-3","Precision Shot 3-3"],"desc":["Attack and kill sword technique damage coefficient increased by 16%","Copy skill critical strike increases by 2%","Healing effect increased by 8%","The damage coefficient of Twin Blade is increased by 10%","Increase damage coefficient of accurate shooting by 10%"],"stat":null,"attr":[]},{"r":4,"name":["Menace Sword 3-4","Magic Mastery 3-4","Healing 3-4","Twin Blade 3-4","Precision Shot 3-4"],"desc":["Attack and kill sword technique damage coefficient increased by 20%","The critical strike of the copied skill is increased by 2.5%","Healing effect increased by 10%","The damage coefficient of Twin Blade is increased by 12.5%","Coefficient of Damage for Accurate Shot increased by 12.5%."],"stat":null,"attr":[]},{"r":5,"name":["Menace Sword 3-5","Magic Mastery 3-5","Healing 3-5","Twin Blade 3-5","Precision Shot 3-5"],"desc":["Attack and kill sword technique damage coefficient increased by 24%","Copy skill critical strike increases by 3%","Healing effect increased by 12%","The damage coefficient of Twin Blade is increased by 15%","Increase damage coefficient of accurate shooting by 15%"],"stat":null,"attr":[]},{"r":6,"name":["Menace Sword 3-6","Magic Mastery 3-6","Healing 3-6","Twin Blade 3-6","Precision Shot 3-6"],"desc":["Attack and kill sword technique damage coefficient increased by 28%","Copy skill critical strike increases by 3.5%","Healing effect increased by 14%","The damage coefficient of Twin Blade is increased by 17.5%","Coefficient of Damage for Accurate Shot increased by 17.5%."],"stat":null,"attr":[]},{"r":7,"name":["Menace Sword 3-7","Magic Mastery 3-7","Healing 3-7","Twin Blade 3-7","Precision Shot 3-7"],"desc":["Attack and kill sword technique damage coefficient increased by 32%","Copy skill critical strike increases by 4%","Healing effect increased by 16%","The damage coefficient of Twin Blade is increased by 20%","Coefficient of damage for accurate shooting increased by 20%."],"stat":null,"attr":[]}],"maxRank":7},{"id":510,"icon":[1103000,1202000,1303000,1403000,1504000],"q":3,"x":63.0,"y":174.0,"act":[176003],"ranks":[{"r":1,"name":["Assassin Sword 1-1","Thunderstorm 1-1","Soul Amulet 1-1","Paralyzing Dagger 1-1","Rapid Fire 1-1"],"desc":["When the target enemy\'s health is below 6%, the damage dealt increases by 20%","Increase lightning teleportation effect on the main target, reducing damage by 70% for each teleportation, with a maximum of 4 targets being teleported","Stacking soul damage effect on the target, reducing target damage by 1% per layer, with a maximum limit of 3 layers","Paralyzing Dagger deals with 4 more targets. Damage will be cumulatively decreased by 70% on each target.","Gain a 3% increase in Attack Power while Attack Speed is up."],"stat":null,"attr":[]},{"r":2,"name":["Assassin Sword 1-2","Thunderstorm 1-2","Soul Amulet 1-2","Paralyzing Dagger 1-2","Rapid Fire 1-2"],"desc":["When the target enemy\'s health is below 9%, the damage dealt increases by 20%","Increase the lightning transmission effect on the main target, reducing damage by 65% for each transmission, with a maximum of 4 targets transmitted","Stacking soul damage effect on the target, reducing target damage by 1.5% per layer, with a maximum limit of 3 layers","Paralyzing Dagger deals with 4 more targets. Damage will be cumulatively decreased by 65% on each target.","Gain 5% Attack Power increase while Attack Speed is increased."],"stat":null,"attr":[]},{"r":3,"name":["Assassin Sword 1-3","Thunderstorm 1-3","Soul Amulet 1-3","Paralyzing Dagger 1-3","Rapid Fire 1-3"],"desc":["When the target enemy\'s health is below 12%, the damage dealt increases by 20%","Increase lightning teleportation effect on the main target, reducing damage by 60% for each teleportation, with a maximum of 4 targets being teleported","Stacking soul damage effect on the target, reducing target damage by 2% per layer, with an upper limit of 3 layers","Paralyzing Dagger deals with 4 more targets. Damage will be cumulatively decreased by 60% on each target.","Gain 7% Attack Power increase while Attack Speed is increased."],"stat":null,"attr":[]},{"r":4,"name":["Assassin Sword 1-4","Thunderstorm 1-4","Soul Amulet 1-4","Paralyzing Dagger 1-4","Rapid Fire 1-4"],"desc":["When the target enemy\'s health is below 15%, the damage dealt is increased by 20%, with an additional 4% of the enemy\'s critical damage for 3 seconds","Increase lightning teleportation effect on the main target, reducing damage by 55% for each teleportation, with a maximum of 4 targets teleported, and 2% additional critical damage for teleportation units","Stack soul damage effects on the target, reducing damage by 2.5% per layer, with a maximum of 3 layers. During soul damage, the target\'s movement speed decreases by 8%","Paralyzing Dagger deals with 4 more targets. Damage will be cumulatively decreased by 55% on each target. Extra targets will be under status of Serious Injury by 2%.","Gain a 9% increase in Attack Power and 2% Lifesteal during Attack Speed Boost."],"stat":null,"attr":[]},{"r":5,"name":["Assassin Sword 1-5","Thunderstorm 1-5","Soul Amulet 1-5","Paralyzing Dagger 1-5","Rapid Fire 1-5"],"desc":["When the health is below 18%, the damage dealt is increased by 20%, with 10% additional damage from the opponent by 6%, lasting for 3 seconds","Increase the lightning transmission effect on the main target, reducing damage by 50% for each transmission, with a maximum of 4 targets transmitted and a 3% additional critical damage for the transmission unit","Stacking soul damage effects on the target, reducing damage by 3% per layer, with an upper limit of 3 layers. During soul damage, the target\'s movement speed is reduced by 12%","Paralyzing Dagger deals with 4 more targets. Damage will be cumulatively decreased by 50% on each target. Extra targets will be under status of Serious Injury by 3%.","Gain a 9% increase in Attack Power and 3% Lifesteal during Attack Speed Boost."],"stat":null,"attr":[]},{"r":6,"name":["Assassin Sword 1-6","Thunderstorm 1-6","Soul Amulet 1-6","Paralyzing Dagger 1-6","Rapid Fire 1-6"],"desc":["When the health is below 21%, the damage dealt is increased by 20%, with 10% additional damage to the opponent by 8%, lasting for 3 seconds","Increase lightning teleportation effect on the main target, reducing damage by 45% per teleportation, with a maximum of 4 targets teleported, and an additional 4% of critical damage for teleportation units","Stacking soul damage effect on the target, reducing damage by 3.5% per layer, with a maximum of 3 layers. During soul damage, the target\'s movement speed is reduced by 16%","Paralyzing Dagger deals with 4 more targets. Damage will be cumulatively decreased by 45% on each target. Extra targets will be under status of Serious Injury by 4%.","Gain 9% Attack Power increase and 4% Lifesteal while Attack Speed is increased."],"stat":null,"attr":[]},{"r":7,"name":["Assassin Sword 1-7","Thunderstorm 1-7","Soul Amulet 1-7","Paralyzing Dagger 1-7","Rapid Fire 1-7"],"desc":["When the health is below 24%, the damage caused is increased by 20%, with 10% additional damage to the opponent. This lasts for 3 seconds, and during the period of severe damage, the player\'s movement speed is reduced by 100%","Increase Lightning Transmission effect on main target, each transmission reduces damage by 40%, up to 4 targets, transmission unit additional critical injury by 5%, 20% probability of silencing the main target for 1.5 seconds.","Stacks Soul Wound effect on target, each layer reduces target\'s damage reduction by 4%, up to 3 layers, target\'s movement speed is reduced by 20% during Soul Wound, and subsequent damage causes 5% defense penetration.","Paralyzing Dagger deals with 4 more targets. Damage will be cumulatively decreased by 45% on each target. Extra targets will be under status of Serious Injury by 4%. There\'s a 20% chance that cast a Silence status on the main target.","During increasing attack speed, you also gain 12% of ATK amplification, 5% of Lifesteal, and 5% of ignoring DEF."],"stat":null,"attr":[]}],"maxRank":7},{"id":511,"icon":[1103000,1202000,1303000,1403000,1504000],"q":3,"x":243.0,"y":342.0,"act":[183003,59003],"ranks":[{"r":1,"name":["Assassin Sword 2-1","Thunderstorm 2-1","Soul Amulet 2-1","Paralyzing Dagger 2-1","Rapid Fire 2-1"],"desc":["15% reduces target\'s luck resistance by 1","30% increases damage to paralyzed targets by 8%","Add an additional 2% damage to the target with accompanying poisoning effects","There\'s a 30% chance that deals 8% more damage to slowed target.","30% Increases damage to blinding targets by 8%."],"stat":null,"attr":[]},{"r":2,"name":["Assassin Sword 2-2","Thunderstorm 2-2","Soul Amulet 2-2","Paralyzing Dagger 2-2","Rapid Fire 2-2"],"desc":["15% reduces target\'s luck resistance by 2","30% increases damage to paralyzed targets by 12%","Add an additional 3% damage to the target with accompanying poisoning effects","There\'s a 30% chance that deals 12% more damage to slowed target.","30% Increases damage to blinding targets by 12%."],"stat":null,"attr":[]},{"r":3,"name":["Assassin Sword 2-3","Thunderstorm 2-3","Soul Amulet 2-3","Paralyzing Dagger 2-3","Rapid Fire 2-3"],"desc":["15% reduces target\'s luck resistance by 3","30% increase damage to paralyzed targets by 16%","Increase target damage by an additional 4% with accompanying poisoning effects","There\'s a 30% chance that deals 16% more damage to slowed target.","30% Increases damage to blinding targets by 16%."],"stat":null,"attr":[]},{"r":4,"name":["Assassin Sword 2-4","Thunderstorm 2-4","Soul Amulet 2-4","Paralyzing Dagger 2-4","Rapid Fire 2-4"],"desc":["15% reduces target\'s luck resistance by 4","30% increase damage to paralyzed targets by 20%","Add an additional 5% damage to the target with accompanying poisoning effects","There\'s a 30% chance that deals 20% more damage to slowed target.","30% Increases damage to blinding targets by 20%."],"stat":null,"attr":[]},{"r":5,"name":["Assassin Sword 2-5","Thunderstorm 2-5","Soul Amulet 2-5","Paralyzing Dagger 2-5","Rapid Fire 2-5"],"desc":["15% reduces target\'s luck resistance by 5","30% increase damage to paralyzed targets by 24%","Increase target damage by an additional 6% with accompanying poisoning effects","There\'s a 30% chance that deals 24% more damage to slowed target.","30% Increases damage to blinding targets by 24%."],"stat":null,"attr":[]},{"r":6,"name":["Assassin Sword 2-6","Thunderstorm 2-6","Soul Amulet 2-6","Paralyzing Dagger 2-6","Rapid Fire 2-6"],"desc":["15% reduces target\'s luck resistance by 6","30% increase damage to paralyzed targets by 28%","Add an additional 7% damage to the target with accompanying poisoning effects","There\'s a 30% chance that deals 28% more damage to slowed target.","30% Increases damage to blinding targets by 28%."],"stat":null,"attr":[]},{"r":7,"name":["Assassin Sword 2-7","Thunderstorm 2-7","Soul Amulet 2-7","Paralyzing Dagger 2-7","Rapid Fire 2-7"],"desc":["15% reduces target\'s luck resistance by 7","30% increase damage to paralyzed targets by 32%","Add an additional 8% damage to the target with accompanying poisoning effects","There\'s a 30% chance that deals 32% more damage to slowed target.","30% Increases damage to blinding targets by 32%."],"stat":null,"attr":[]}],"maxRank":7},{"id":512,"icon":[1103000,1202000,1303000,1403000,1504000],"q":3,"x":303.0,"y":510.0,"act":[56003],"ranks":[{"r":1,"name":["Assassin Sword 3-1","Thunderstorm 3-1","Soul Amulet 3-1","Paralyzing Dagger 3-1","Rapid Fire 3-1"],"desc":["15% chance to inflict 4% splash damage on 2 units near the target","Paralysis dealt with to a target is increased by 0.2s","Deals 2% splash damage to the target location, with a maximum of 2","Time of the slowed effect to the target will be increased by 0.2 second.","Attack speed boost time increased by 0.2 seconds"],"stat":null,"attr":[]},{"r":2,"name":["Assassin Sword 3-2","Thunderstorm 3-2","Soul Amulet 3-2","Paralyzing Dagger 3-2","Rapid Fire 3-2"],"desc":["15% chance to inflict 6% splash damage on 2 units near the target","Paralysis dealt with to a target is increased by 0.3s","Deals 3% splash damage to the target location, with a maximum of 2","Time of the slowed effect to the target will be increased by 0.3 second.","Attack speed boost time increased by 0.3 seconds"],"stat":null,"attr":[]},{"r":3,"name":["Assassin Sword 3-3","Thunderstorm 3-3","Soul Amulet 3-3","Paralyzing Dagger 3-3","Rapid Fire 3-3"],"desc":["15% chance to inflict 8% splash damage on 2 units near the target","Paralysis dealt with to a target is increased by 0.4s","Deals 4% splash damage to the target location, with a maximum of 2","Time of the slowed effect to the target will be increased by 0.4 second.","Attack speed boost time increased by 0.4 seconds"],"stat":null,"attr":[]},{"r":4,"name":["Assassin Sword 3-4","Thunderstorm 3-4","Soul Amulet 3-4","Paralyzing Dagger 3-4","Rapid Fire 3-4"],"desc":["15% chance to inflict 10% splash damage on 3 units near the target","Paralysis dealt with to a target is increased by 0.5s","Deal 5% splash damage to the target location, with a maximum of 3","Time of the slowed effect to the target will be increased by 0.5 second.","Attack speed boost time increased by 0.5 seconds"],"stat":null,"attr":[]},{"r":5,"name":["Assassin Sword 3-5","Thunderstorm 3-5","Soul Amulet 3-5","Paralyzing Dagger 3-5","Rapid Fire 3-5"],"desc":["15% chance to inflict 12% splash damage on 3 units near the target","Paralysis dealt with to a target is increased by 0.6s","Deals 6% splash damage to the target location, with a maximum of 3 damage points","Time of the slowed effect to the target will be increased by 0.6 second.","Attack speed boost time increased by 0.6 seconds"],"stat":null,"attr":[]},{"r":6,"name":["Assassin Sword 3-6","Thunderstorm 3-6","Soul Amulet 3-6","Paralyzing Dagger 3-6","Rapid Fire 3-6"],"desc":["15% chance to inflict 14% splash damage on 3 units near the target","Paralysis dealt with to a target is increased by 0.7s","Deal 7% splash damage to the target location, with a maximum of 3 damage","Time of the slowed effect to the target will be increased by 0.7 second.","Attack speed boost time increased by 0.8 seconds"],"stat":null,"attr":[]},{"r":7,"name":["Assassin Sword 3-7","Thunderstorm 3-7","Soul Amulet 3-7","Paralyzing Dagger 3-7","Rapid Fire 3-7"],"desc":["15% chance to inflict 16% splash damage on 4 units near the target","Paralysis dealt with to a target is increased by 0.8s","Deal 8% splash damage to the target location, with a maximum of 4 damage","Time of the slowed effect to the target will be increased by 0.8 second.","Attack speed boost time increased by 1 seconds"],"stat":null,"attr":[]}],"maxRank":7},{"id":520,"icon":[1104000,1203000,1304000,1404000,1503000],"q":3,"x":1023.0,"y":174.0,"act":[155003],"ranks":[{"r":1,"name":["Crescent Blade 1-1","Firewall Spell 1-1","Poisoning 1-1","Death Bloom 1-1","Dark Thunder 1-1"],"desc":["This attack deals a blood sucking effect of 25% damage, with a maximum blood sucking limit of 0.4% of maximum health","Players inside the fire wall will receive an additional 2% vulnerability effect","20% ignore poisoned target damage 4%","There\'s a 20% chance that casts a debuff, Misfortune, to nearby targets. The debuff reduces targets\' luck by 2 and lasts for 5 seconds.","Release Dark Thunder, 20% of triggers increase your Luck by 2 for 5 seconds."],"stat":null,"attr":[]},{"r":2,"name":["Crescent Blade 1-2","Firewall Spell 1-2","Poisoning 1-2","Death Bloom 1-2","Dark Thunder 1-2"],"desc":["This attack deals a blood sucking effect of 25% damage, with a maximum blood sucking limit of 0.6% of maximum health","Players inside the fire wall will receive an additional 3% vulnerability effect","20% ignore poisoned target damage 6%","There\'s a 20% chance that casts a debuff, Misfortune, to nearby targets. The debuff reduces targets\' luck by 3 and lasts for 5 seconds.","Release Dark Thunder, 20% of triggers increase your Luck by 3 for 5 seconds."],"stat":null,"attr":[]},{"r":3,"name":["Crescent Blade 1-3","Firewall Spell 1-3","Poisoning 1-3","Death Bloom 1-3","Dark Thunder 1-3"],"desc":["This attack deals a blood sucking effect of 25% damage, with a maximum blood sucking limit of 0.8% of maximum health","Players inside the fire wall will receive an additional 4% vulnerability effect","20% ignore poisoned target damage 8%","There\'s a 20% chance that casts a debuff, Misfortune, to nearby targets. The debuff reduces targets\' luck by 4 and lasts for 5 seconds.","Release Dark Thunder, 20% of triggers increase your Luck by 4 for 5 seconds."],"stat":null,"attr":[]},{"r":4,"name":["Crescent Blade 1-4","Firewall Spell 1-4","Poisoning 1-4","Death Bloom 1-4","Dark Thunder 1-4"],"desc":["This attack deals a blood sucking effect of 25% damage. The maximum blood sucking limit is 1% of the maximum health, and 20% of the health overflow from blood sucking is converted to shield value (the maximum shield value is 50% of the maximum health)","Enemies in the Firewall will be casted with 5% of Vulnerable. The DMG dealt by the Firewall will be double if they died in it.","20% ignore poisoning target damage by 10%, 4% cause fear for 1 second during poisoning period","There\'s a 20% chance that casts a debuff, Misfortune, to nearby targets. The debuff reduces targets\' luck by 5 and lasts for 5 seconds. Your damage to the debuffed targets will be increased by 5%","Unleash Lightning, 20% triggers increase your Luck by 5, lasts for 5 sec, damage dealt to target during this time is increased by 5%."],"stat":null,"attr":[]},{"r":5,"name":["Crescent Blade 1-5","Firewall Spell 1-5","Poisoning 1-5","Death Bloom 1-5","Dark Thunder 1-5"],"desc":["This attack deals a blood sucking effect of 25% damage, with a maximum blood sucking limit of 1.2% of maximum health. 30% of the health overflow from blood sucking is converted to shield value (the maximum shield value is 50% of maximum health)","Enemies in the Firewall will be casted with 6% of Vulnerable. The DMG dealt by the Firewall will be double if they died in it.","20% ignore target damage caused by poisoning by 12%, and during poisoning, 6% cause fear for 1 second","There\'s a 20% chance that casts a debuff, Misfortune, to nearby targets. The debuff reduces targets\' luck by 6 and lasts for 5 seconds. Your damage to the debuffed targets will be increased by 6%","Unleash Dark Thunder, 20% trigger boosts your Luck 6 for 5 sec, during which time damage dealt to target increases by 6%."],"stat":null,"attr":[]},{"r":6,"name":["Crescent Blade 1-6","Firewall Spell 1-6","Poisoning 1-6","Death Bloom 1-6","Dark Thunder 1-6"],"desc":["This attack deals a blood sucking effect of 25% damage, with a maximum blood sucking limit of 1.4% of maximum health. 40% of the health overflow from blood sucking is converted to shield value (the maximum shield value is 50% of maximum health)","Enemies in the Firewall will be casted with 7% of Vulnerable. The DMG dealt by the Firewall will be double if they died in it.","20% ignore poisoned target damage 14%, 8% cause fear for 1 second during poisoning period","There\'s a 20% chance that casts a debuff, Misfortune, to nearby targets. The debuff reduces targets\' luck by 7 and lasts for 5 seconds. Your damage to the debuffed targets will be increased by 8%","Unleash Dark Thunder, 20% triggers increase your Luck by 7, lasts 5 sec, increases damage dealt to target by 8% for the duration."],"stat":null,"attr":[]},{"r":7,"name":["Crescent Blade 1-7","Firewall Spell 1-7","Poisoning 1-7","Death Bloom 1-7","Dark Thunder 1-7"],"desc":["This attack deals a blood sucking effect of 25% damage, with a maximum blood sucking limit of 1.6% of the maximum health. 50% of the health overflow from blood sucking is converted into shield value (with a maximum health limit of 50%). When the shield disappears, it explodes and causes 10% of the maximum health damage to nearby players","Enemies in the Firewall will be casted with 8% of Vulnerable. The DMG dealt by the Firewall will be double if they died in it.","20% ignore poisoned target damage by 16%, 80% cause fear for 1 second during poisoning period, increase damage to poisoned target by luck and deepen damage by 15%","There\'s a 20% chance that casts a debuff, Misfortune, to nearby targets. The debuff reduces targets\' luck by 7 and lasts for 5 seconds. Your damage to the debuffed targets will be increased by 8%. And it\'s ATK speed will be decreased by 15.","Unleash Dark Thunder, 20% triggers increase your Luck by 8 for 5 sec, damage to target increases by 10%, and your movement speed increases by 10%."],"stat":null,"attr":[]}],"maxRank":7},{"id":521,"icon":[1104000,1203000,1304000,1404000,1503000],"q":3,"x":903.0,"y":342.0,"act":[162003],"ranks":[{"r":1,"name":["Crescent Blade 2-1","Firewall Spell 2-1","Poisoning 2-1","Death Bloom 2-1","Dark Thunder 2-1"],"desc":["Increase bleeding effect by 10%","Each damage dealt by the Firewall reduces 0.1s CD of all skill","6% Clear player\'s random gain effect","6% Clear player\'s random gain effect","Attacking an enemy damaged by Lightning Blast reduces their movement speed by 5% for 3 sec."],"stat":null,"attr":[]},{"r":2,"name":["Crescent Blade 2-2","Firewall Spell 2-2","Poisoning 2-2","Death Bloom 2-2","Dark Thunder 2-2"],"desc":["Increase bleeding effect by 15%","Each damage dealt by the Firewall reduces 0.15s CD of all skill","9% Clear player\'s random 1 buff effect","9% Clear player\'s random 1 buff effect","Attacking an enemy damaged by Lightning Blast reduces their Movement Speed by 6% for 3 sec."],"stat":null,"attr":[]},{"r":3,"name":["Crescent Blade 2-3","Firewall Spell 2-3","Poisoning 2-3","Death Bloom 2-3","Dark Thunder 2-3"],"desc":["Increase bleeding effect by 20%","Each damage dealt by the Firewall reduces 0.2s CD of all skill","12% Clear player\'s random gain effect","12% Clear player\'s random gain effect","Attacking a Lightning Blasted enemy reduces their Movement Speed by 30% for 7% for 3 sec."],"stat":null,"attr":[]},{"r":4,"name":["Crescent Blade 2-4","Firewall Spell 2-4","Poisoning 2-4","Death Bloom 2-4","Dark Thunder 2-4"],"desc":["Increase bleeding effect by 25%","Each damage dealt by the Firewall reduces 0.25s CD of all skill","15% clear player\'s random 2 gain effects","15% clear player\'s random 2 gain effects","Attacking a Lightning Blasted enemy reduces their Movement Speed by 30% for 9% for 3 sec."],"stat":null,"attr":[]},{"r":5,"name":["Crescent Blade 2-5","Firewall Spell 2-5","Poisoning 2-5","Death Bloom 2-5","Dark Thunder 2-5"],"desc":["Increase bleeding effect by 30%","Each damage dealt by the Firewall reduces 0.3s CD of all skill","18% Clear 2 random buff effects for players","18% Clear 2 random buff effects for players","Attacking a Lightning Blasted enemy reduces their Movement Speed by 30% for 11% for 3 sec."],"stat":null,"attr":[]},{"r":6,"name":["Crescent Blade 2-6","Firewall Spell 2-6","Poisoning 2-6","Death Bloom 2-6","Dark Thunder 2-6"],"desc":["Increase bleeding effect by 35%","Each damage dealt by the Firewall reduces 0.35s CD of all skill","21% Clear 2 random gain effects from players","21% Clear 2 random gain effects from players","Attacking a Lightning Blasted enemy reduces their Movement Speed by 30% for 13% for 3 sec."],"stat":null,"attr":[]},{"r":7,"name":["Crescent Blade 2-7","Firewall Spell 2-7","Poisoning 2-7","Death Bloom 2-7","Dark Thunder 2-7"],"desc":["Increase bleeding effect by 40%","Each damage dealt by the Firewall reduces 0.4s CD of all skill","24% Clear player\'s random 3 buff effects","24% Clear player\'s random 3 buff effects","Attacking a Lightning Blasted enemy reduces their Movement Speed by 15% for 3 sec."],"stat":null,"attr":[]}],"maxRank":7},{"id":522,"icon":[1104000,1203000,1304000,1404000,1503000],"q":3,"x":783.0,"y":510.0,"act":[151003],"ranks":[{"r":1,"name":["Crescent Blade 3-1","Firewall Spell 3-1","Poisoning 3-1","Death Bloom 3-1","Dark Thunder 3-1"],"desc":["20% adds a 4% vulnerability effect to enemies with bleeding effects","Target hit rate of players inside the firewall reduced by 2%","20% reduction in target movement speed by 20%","20% reduction in target movement speed by 20%","Attacking enemies damaged by Lightning Blast increases damage by 2%."],"stat":null,"attr":[]},{"r":2,"name":["Crescent Blade 3-2","Firewall Spell 3-2","Poisoning 3-2","Death Bloom 3-2","Dark Thunder 3-2"],"desc":["20% adds a 6% vulnerability effect to enemies with bleeding effects","Target hit rate of players inside the firewall reduced by 3%","20% reduces target movement speed by 30","20% reduces target movement speed by 30","Attacking enemies damaged by Lightning Blast increases damage by 3%."],"stat":null,"attr":[]},{"r":3,"name":["Crescent Blade 3-3","Firewall Spell 3-3","Poisoning 3-3","Death Bloom 3-3","Dark Thunder 3-3"],"desc":["20% inflicts an additional vulnerability effect of 8% on enemies with bleeding effects","Target hit rate of players inside the firewall reduced by 4%","20% reduction in target movement speed by 40","20% reduction in target movement speed by 40","Attacking an enemy damaged by Lightning Blast increases damage by 4%."],"stat":null,"attr":[]},{"r":4,"name":["Crescent Blade 3-4","Firewall Spell 3-4","Poisoning 3-4","Death Bloom 3-4","Dark Thunder 3-4"],"desc":["20% adds a 10% vulnerability effect to enemies with bleeding effects","Target hit rate of players inside the firewall reduced by 5%","20% reduces target movement speed by 50","20% reduces target movement speed by 50","Attacking an enemy wounded by Lightning Blast increases their damage by 5%."],"stat":null,"attr":[]},{"r":5,"name":["Crescent Blade 3-5","Firewall Spell 3-5","Poisoning 3-5","Death Bloom 3-5","Dark Thunder 3-5"],"desc":["20% adds a 12% vulnerability effect to enemies with bleeding effects","Target hit rate of players inside the firewall reduced by 6%","20% reduction in target movement speed by 60","20% reduction in target movement speed by 60","Attacking an enemy wounded by Lightning Blast increases their damage by 7%."],"stat":null,"attr":[]},{"r":6,"name":["Crescent Blade 3-6","Firewall Spell 3-6","Poisoning 3-6","Death Bloom 3-6","Dark Thunder 3-6"],"desc":["20% adds a vulnerability effect to enemies with bleeding effects by 14%","Target hit rate of players inside the firewall reduced by 7%","20% reduction in target movement speed by 70","20% reduction in target movement speed by 70","Attacking an enemy wounded by Lightning Blast increases their damage by 9%."],"stat":null,"attr":[]},{"r":7,"name":["Crescent Blade 3-7","Firewall Spell 3-7","Poisoning 3-7","Death Bloom 3-7","Dark Thunder 3-7"],"desc":["20% adds a vulnerable effect to enemies with bleeding effects by 16%","Target hit rate of players inside the firewall reduced by 8%","20% reduction in target movement speed by 80%","20% reduction in target movement speed by 80%","Attacking a Lightning Bolt damaged enemy increases damage by 12%."],"stat":null,"attr":[]}],"maxRank":7},{"id":530,"icon":[1105000,1204000,1305000,1405000,1505000],"q":3,"x":63.0,"y":1056.0,"act":[37003],"ranks":[{"r":1,"name":["Savage Rush 1-1","Temptation 1-1","Summoning 1-1","Fatal Sting 1-1","Evasive Shot 1-1"],"desc":["15% Defeat target and 10% defense, lasting for 5 seconds","After killing the target, summon the beast to stack a bloodthirsty state, increasing critical strike by 0.4% for 5 seconds, with a maximum stack of 5 layers","After killing the target, summon the beast to stack a bloodthirsty state, increasing critical strike by 0.6% and stacking up to 5 layers","Crit damage reduction of enemies in 1 slot from you will be decreased by 5%, lasting for 5 seconds.","15% Weaken target\'s attack by 10% for 3 sec."],"stat":null,"attr":[]},{"r":2,"name":["Savage Rush 1-2","Temptation 1-2","Summoning 1-2","Fatal Sting 1-2","Evasive Shot 1-2"],"desc":["15% Defeat target 15% for 5 seconds","After killing the target, summon the beast to stack a bloodthirsty state, increasing critical strike by 0.6% for 5 seconds, with a maximum stack of 5 layers","After killing the target, summon the beast to stack a bloodthirsty state, increasing critical strike by 0.9% and stacking up to 5 layers","Crit DMG RED of enemy in 1 slot from you is decreased by 7.5% for 5s","15% weaken target\'s attack by 15% for 3 seconds."],"stat":null,"attr":[]},{"r":3,"name":["Savage Rush 1-3","Temptation 1-3","Summoning 1-3","Fatal Sting 1-3","Evasive Shot 1-3"],"desc":["15% Defeat target by 20%, lasting for 5 seconds","After killing the target, summon the beast to stack a bloodthirsty state, increasing critical strike by 0.8% for 5 seconds, with a maximum stack of 5 layers","After killing the target, summon the beast to stack a bloodthirsty state, increasing critical strike by 1.2% and stacking up to 5 layers","Crit DMG RED of enemy in 1 slot from you is decreased by 10% for 5s","Weaken target by 20% for 3 sec."],"stat":null,"attr":[]},{"r":4,"name":["Savage Rush 1-4","Temptation 1-4","Summoning 1-4","Fatal Sting 1-4","Evasive Shot 1-4"],"desc":["Have 15% of chance to reduce 25% of enemy\'s DEF for 5s. Stun the target that has been reduced DEF for 1s after 7 attacks.","After killing targets, summonings will gain Bloodlust status. Summoning will increase their Fatal hit by 1% and ignore DEF by 10% for 5s. Bloodlust has 5 stacks at most.","After killing the target, summon the beast to stack a bloodthirsty state, increasing critical strike by 1.5%, stacking up to 5 layers, and increasing damage reduction by 4%","Crit damage reduction of enemies in 1 slot from you will be decreased by 12.5%, lasting for 5 seconds. Your DEF amplification will be increased by 6%.","15% weaken target 20% attack, increase damage to blinded units by 20% for 3 sec."],"stat":null,"attr":[]},{"r":5,"name":["Savage Rush 1-5","Temptation 1-5","Summoning 1-5","Fatal Sting 1-5","Evasive Shot 1-5"],"desc":["Have 15% of chance to reduce 30% of enemy\'s DEF for 5s. Stun the target that has been reduced DEF for 1s after 6 attacks.","After killing targets, summonings will gain Bloodlust status. Summoning will increase their Fatal hit by 1.2% and ignore DEF by 20% for 5s. Bloodlust has 5 stacks at most.","After killing the target, summon the beast to stack a bloodthirsty state, increasing critical hits by 1.8%, stacking up to 5 layers, and increasing damage reduction by 6%","Crit damage reduction of enemies in 1 slot from you will be decreased by 15%, lasting for 5 seconds. Your DEF amplification will be increased by 9%.","15% weaken target 20% attack, increase damage to blinded units by 25% for 3 sec."],"stat":null,"attr":[]},{"r":6,"name":["Savage Rush 1-6","Temptation 1-6","Summoning 1-6","Fatal Sting 1-6","Evasive Shot 1-6"],"desc":["Have 15% of chance to reduce 35% of enemy\'s DEF for 5s. Stun the target that has been reduced DEF for 1s after 5 attacks.","After killing targets, summonings will gain Bloodlust status. Summoning will increase their Fatal hit by 1.4% and ignore DEF by 30% for 5s. Bloodlust has 5 stacks at most.","After killing the target, summon the beast to stack a bloodthirsty state, increasing critical strike by 2.1%, stacking up to 5 layers, and increasing damage reduction by 8%","Crit damage reduction of enemies in 1 slot from you will be decreased by 17.5%, lasting for 5 seconds. Your DEF amplification will be increased by 12%.","15% weaken target 20% attack, increase damage to blinded units by 30% for 3 sec."],"stat":null,"attr":[]},{"r":7,"name":["Savage Rush 1-7","Temptation 1-7","Summoning 1-7","Fatal Sting 1-7","Evasive Shot 1-7"],"desc":["Have 15% of chance to reduce 40% of enemy\'s DEF for 5s. Stun the target that has been reduced DEF for 1s after 4 attacks. Target\'s DMG will be reduced by 20% after stunning for 3s.","After killing targets, summonings will gain Bloodlust status. Summoning will increase their Fatal hit by 1.6%, ignore DEF by 40%, and increased their Luck resistance by 3 for 5s. Bloodlust has 5 stacks at most.","After killing the target, summon the beast to stack a bloodthirsty state, increasing critical hits by 2.4%, up to 5 layers, and increasing damage reduction by 10%. White Tiger attacks by 3% to intimidate the target, causing them to stun for 2 seconds","Crit damage reduction of enemies in 1 slot from you will be decreased by 12.5%, lasting for 5 seconds. Your DEF amplification will be increased by 6%. There\'s a 15% chance that all your debuff will be cleared.","15% weaken target 20% attack, increase damage to blinding units by 30% for 3 sec; attacking blinding units has a 20% chance to stun them for 1 sec."],"stat":null,"attr":[]}],"maxRank":7},{"id":531,"icon":[1105000,1204000,1305000,1405000,1505000],"q":3,"x":123.0,"y":930.0,"act":[125003],"ranks":[{"r":1,"name":["Savage Rush 2-1","Temptation 2-1","Summoning 2-1","Fatal Sting 2-1","Evasive Shot 2-1"],"desc":["4% eliminate the target\'s gain effect","Each attack reduces player\'s defense by 1%, lasts for 3 seconds, and can stack up to 5 layers","Restore 2% of the character\'s health loss upon death","While Fatal Sting is working, the amplification of your crit damage will be increased by 6%, lasting for 5 seconds.","Evasive Shot 6% removes 1 random gain effect from player"],"stat":null,"attr":[]},{"r":2,"name":["Savage Rush 2-2","Temptation 2-2","Summoning 2-2","Fatal Sting 2-2","Evasive Shot 2-2"],"desc":["6% eliminate the buff effect on the target","Each attack reduces player\'s defense by 1.5%, lasts for 3 seconds, and can stack up to 5 layers","Restore 3% of the character\'s health lost upon death","While Fatal Sting is working, the amplification of your crit damage will be increased by 9%, lasting for 5 seconds.","Evasive Shot 9% removes 1 random gain effect from player"],"stat":null,"attr":[]},{"r":3,"name":["Savage Rush 2-3","Temptation 2-3","Summoning 2-3","Fatal Sting 2-3","Evasive Shot 2-3"],"desc":["8% eliminate the target\'s gain effect","Each attack reduces player\'s defense by 2%, lasts for 3 seconds, and can stack up to 5 layers","Restore 4% of the character\'s health loss upon death","While Fatal Sting is working, the amplification of your crit damage will be increased by 12%, lasting for 5 seconds.","Evasive Shot 12%Clear 1 random gain from player"],"stat":null,"attr":[]},{"r":4,"name":["Savage Rush 2-4","Temptation 2-4","Summoning 2-4","Fatal Sting 2-4","Evasive Shot 2-4"],"desc":["10% eliminate the buff effect on the target","Each attack reduces player\'s defense by 2.5%, lasts for 3 seconds, and can stack up to 5 layers","Restore 5% of the character\'s health loss upon death","While Fatal Sting is working, the amplification of your crit damage will be increased by 15%, lasting for 5 seconds.","Evasive Shot 15% removes 2 random gains from the player."],"stat":null,"attr":[]},{"r":5,"name":["Savage Rush 2-5","Temptation 2-5","Summoning 2-5","Fatal Sting 2-5","Evasive Shot 2-5"],"desc":["12% eliminate the target\'s gain effect","Each attack reduces player\'s defense by 3%, lasts for 3 seconds, and can stack up to 5 layers","Restore 6% of the character\'s health loss upon death","While Fatal Sting is working, the amplification of your crit damage will be increased by 18%, lasting for 5 seconds.","Evasive Shot 18% removes 2 random gains from the player."],"stat":null,"attr":[]},{"r":6,"name":["Savage Rush 2-6","Temptation 2-6","Summoning 2-6","Fatal Sting 2-6","Evasive Shot 2-6"],"desc":["14% eliminate the target\'s gain effect","Each attack reduces player\'s defense by 3.5%, lasts for 3 seconds, and can stack up to 5 layers","When dead, restore that the character\'s health has been damaged by 7%","While Fatal Sting is working, the amplification of your crit damage will be increased by 21%, lasting for 5 seconds.","Evasive Shot 21%Clears player of 2 random bonuses."],"stat":null,"attr":[]},{"r":7,"name":["Savage Rush 2-7","Temptation 2-7","Summoning 2-7","Fatal Sting 2-7","Evasive Shot 2-7"],"desc":["16% eliminate the gain effect on the target","Each attack reduces player\'s defense by 4%, lasts for 3 seconds, and can stack up to 5 layers","Restore 8% of the character\'s health loss upon death","While Fatal Sting is working, the amplification of your crit damage will be increased by 24%, lasting for 5 seconds.","Evasive Shot 24% removes 3 randomized gains from the player."],"stat":null,"attr":[]}],"maxRank":7},{"id":532,"icon":[1105000,1204000,1305000,1405000,1505000],"q":3,"x":183.0,"y":762.0,"act":[192003],"ranks":[{"r":1,"name":["Savage Rush 3-1","Temptation 3-1","Summoning 3-1","Fatal Sting 3-1","Evasive Shot 3-1"],"desc":["20% reduces target attack speed by 6%","Summoning beasts increases movement speed by 20","Summoning beasts increases movement speed by 20","If Fatal Sting expires, your Tenacity will be increased by 6% for 5 seconds.","Increase Crit by 3% got 6s after mobility move"],"stat":null,"attr":[]},{"r":2,"name":["Savage Rush 3-2","Temptation 3-2","Summoning 3-2","Fatal Sting 3-2","Evasive Shot 3-2"],"desc":["20% reduces target attack speed by 9%","Summoning beasts increases movement speed by 30","Summoning beasts increases movement speed by 30","If Fatal Sting expires, your Tenacity will be increased by 9% for 5 seconds.","Increase Crit by 5% got 6s after mobility move"],"stat":null,"attr":[]},{"r":3,"name":["Savage Rush 3-3","Temptation 3-3","Summoning 3-3","Fatal Sting 3-3","Evasive Shot 3-3"],"desc":["20% reduces attack speed on target by 12%","Summoning beasts increases movement speed by 40","Summoning beasts increases movement speed by 40","If Fatal Sting expires, your Tenacity will be increased by 12% for 5 seconds.","Increase Crit by 7% got 6s after mobility move"],"stat":null,"attr":[]},{"r":4,"name":["Savage Rush 3-4","Temptation 3-4","Summoning 3-4","Fatal Sting 3-4","Evasive Shot 3-4"],"desc":["20% reduces target attack speed by 15%","Summoning beasts increases movement speed by 50","Summoning beasts increases movement speed by 50","If Fatal Sting expires, your Tenacity will be increased by 15% for 5 seconds.","Increase Crit by 9% got 6s after mobility move"],"stat":null,"attr":[]},{"r":5,"name":["Savage Rush 3-5","Temptation 3-5","Summoning 3-5","Fatal Sting 3-5","Evasive Shot 3-5"],"desc":["20% reduces attack speed on target by 18%","Summoning beasts increases movement speed by 60","Summoning beasts increases movement speed by 60","If Fatal Sting expires, your Tenacity will be increased by 18% for 5 seconds.","Increase Crit by 11% got 6s after mobility move"],"stat":null,"attr":[]},{"r":6,"name":["Savage Rush 3-6","Temptation 3-6","Summoning 3-6","Fatal Sting 3-6","Evasive Shot 3-6"],"desc":["20% reduces attack speed on target by 21%","Summoning beasts increases movement speed by 70","Summoning beasts increases movement speed by 70","If Fatal Sting expires, your Tenacity will be increased by 21% for 5 seconds.","Increase Crit by 13% got 6s after mobility move"],"stat":null,"attr":[]},{"r":7,"name":["Savage Rush 3-7","Temptation 3-7","Summoning 3-7","Fatal Sting 3-7","Evasive Shot 3-7"],"desc":["20% reduces attack speed on target by 24%","Summoned beast movement speed increased by 80","Summoned beast movement speed increased by 80","If Fatal Sting expires, your Tenacity will be increased by 24% for 5 seconds.","Increase Crit by 15% got 6s after mobility move"],"stat":null,"attr":[]}],"maxRank":7},{"id":540,"icon":[1106000,1205000,1306000,1406000,1506000],"q":3,"x":543.0,"y":90.0,"act":[177003],"ranks":[{"r":1,"name":["Energy Within 1-1","Magic Shield 1-1","Divine Armor 1-1","Stealth Strike 1-1","Devil\'s Descent 1-1"],"desc":["Burn attacks nearby units at 1% damage per second","When the shield is present, all skill penetration increases by 2%","Enemies within 1 square range reduce defense by 2% for 5 seconds","There\'s a 25% chance that deals a burning damage of 1% of target\'s current HP to enemy player, lasting for 3 seconds.","During Demonfall, 5% deals 1.5x damage."],"stat":null,"attr":[]},{"r":2,"name":["Energy Within 1-2","Magic Shield 1-2","Divine Armor 1-2","Stealth Strike 1-2","Devil\'s Descent 1-2"],"desc":["Burn attacks nearby units at 1.5% damage per second","When the shield is present, all skill penetration increases by 3%","Enemies within 1 square range reduce defense by 3% for 5 seconds","There\'s a 25% chance that deals a burning damage of 1.5% of target\'s current HP to enemy player, lasting for 3 seconds.","7% deals 1.7x damage during demonic descent"],"stat":null,"attr":[]},{"r":3,"name":["Energy Within 1-3","Magic Shield 1-3","Divine Armor 1-3","Stealth Strike 1-3","Devil\'s Descent 1-3"],"desc":["Burn attack on nearby units at 2% damage per second","When the shield is present, all skill penetration increases by 4%","Enemies within 1 square range reduce defense by 4% for 5 seconds","There\'s a 25% chance that deals a burning damage of 2% of target\'s current HP to enemy player, lasting for 3 seconds.","10% deals 2x damage during demonic descent"],"stat":null,"attr":[]},{"r":4,"name":["Energy Within 1-4","Magic Shield 1-4","Divine Armor 1-4","Stealth Strike 1-4","Devil\'s Descent 1-4"],"desc":["Burn attacks on nearby units at 2.5% damage per second, and remove one buff from the target\'s body at 6% damage","When a shield is present, all skill penetration increases by 5%, shield resilience increases by 1%, and evasion increases by 1%","Enemies besides you within 1 slot will lose 5% of the DEF for 5s. Your HP AMP is increased by 8%.","There\'s a 25% chance that deals a burning damage of 2.5% of target\'s current HP to enemy player, lasting for 3 seconds. You\'ll stun the target for 0.8s after casting the skill.","During Demonbane, 15% deals 2x damage; all damage dealt rebounds by 30"],"stat":null,"attr":[]},{"r":5,"name":["Energy Within 1-5","Magic Shield 1-5","Divine Armor 1-5","Stealth Strike 1-5","Devil\'s Descent 1-5"],"desc":["Burn attacks on nearby units at 3% damage per second, and remove a buff from the target\'s body at 9% damage","When a shield is present, all skill penetration increases by 6%, shield resilience increases by 1.5%, and evasion increases by 1.5%","Enemies besides you within 1 slot will lose 6% of the DEF for 5s. Your HP AMP is increased by 12%.","There\'s a 25% chance that deals a burning damage of 3% of target\'s current HP to enemy player, lasting for 1.2 seconds. You\'ll stun the target for 0.8s after casting the skill.","During Demonfall, 20% deal 2x damage; damage bounces back 35%."],"stat":null,"attr":[]},{"r":6,"name":["Energy Within 1-6","Magic Shield 1-6","Divine Armor 1-6","Stealth Strike 1-6","Devil\'s Descent 1-6"],"desc":["Burn attacks on nearby units at 3.5% damage per second, and remove one buff from the target\'s body at 12% damage","When a shield is present, all skill penetration increases by 7%, shield resilience increases by 2%, and evasion increases by 2%","Enemies besides you within 1 slot will lose 7% of the DEF for 5s. Your HP AMP is increased by 16%.","There\'s a 25% chance that deals a burning damage of 3.5% of target\'s current HP to enemy player, lasting for 3 seconds. You\'ll stun the target for 1.6s after casting the skill.","During Demonfall, 20% deal 2x damage; damage bounces back 35%."],"stat":null,"attr":[]},{"r":7,"name":["Energy Within 1-7","Magic Shield 1-7","Divine Armor 1-7","Stealth Strike 1-7","Devil\'s Descent 1-7"],"desc":["Burn attack on nearby units by 4% per second, remove one buff from the target by 15%, and increase character\'s luck resistance by 1","When the shield is present, all skills penetration is increased by 8%, shield resilience is increased by 2.5%, evasion is increased by 2.5%, and after the shield is broken, 20% PVP damage reduction is added to oneself for 3 seconds","Enemies besides you within 1 slot will lose 8% of the DEF for 5s. Your HP AMP is increased by 8% and DE-buff has 15% of chance to be casted away.","There\'s a 25% chance that deals a burning damage of 4% of target\'s current HP to enemy player, lasting for 3 seconds. You\'ll stun the target for 2s and gain extra 5% chance of fatal hit after casting the skill.","During demonic descent, 20% deals 2x damage; all damage bounces back 35% and has a 20% chance of regaining 5% of its maximum life."],"stat":null,"attr":[]}],"maxRank":7},{"id":541,"icon":[1106000,1205000,1306000,1406000,1506000],"q":3,"x":423.0,"y":258.0,"act":[116003],"ranks":[{"r":1,"name":["Energy Within 2-1","Magic Shield 2-1","Divine Armor 2-1","Stealth Strike 2-1","Devil\'s Descent 2-1"],"desc":["For every 20 attacks, the armor bursts and PVP reduces damage by 3% for 5 seconds","When the shield disappears, a 10% bonus of 1 second invincibility is added","When the armor state exists, the health recovery effect increases by 4% for 5 seconds","After 20 times of Stealth Strike on the current field, damage of the next one will be doubled.","When Demonfall disappears, 10% of the time, you gain invincibility for 1 second."],"stat":null,"attr":[]},{"r":2,"name":["Energy Within Body 2-2","Magic Shield 2-2","Divine Armor 2-2","Stealth Strike 2-2","Devil\'s Descent 2-2"],"desc":["For every 20 attacks, the protective body bursts, and PVP reduces damage by 4.5% for 5 seconds","When the shield disappears, a 15% bonus of 1 second invincibility is added","When the battle armor state exists, the health recovery effect increases by 6% for 5 seconds","After 18 times of Stealth Strike on the current field, damage of the next one will be doubled.","When Demonfall disappears, 15% gain Invincibility for 1 sec."],"stat":null,"attr":[]},{"r":3,"name":["Energy Within 2-3","Magic Shield 2-3","Divine Armor 2-3","Stealth Strike 2-3","Devil\'s Descent 2-3"],"desc":["For every 20 attacks, the armor bursts and PVP reduces damage by 6% for 5 seconds","When the shield disappears, a 20% bonus of 1 second invincibility is added","When the battle armor state exists, the health recovery effect increases by 8% for 5 seconds","After 16 times of Stealth Strike on the current field, damage of the next one will be doubled.","When Demon descends and disappears, 20% of the time, you gain 1 second invincibility."],"stat":null,"attr":[]},{"r":4,"name":["Energy Within 2-4","Magic Shield 2-4","Divine Armor 2-4","Stealth Strike 2-4","Devil\'s Descent 2-4"],"desc":["For every 20 attacks, the armor bursts and PVP reduces damage by 7.5% for 5 seconds","When the shield disappears, a 25% bonus of 1 second invincibility is added","When the armor state exists, the health recovery effect increases by 10% for 5 seconds","After 14 times of Stealth Strike on the current field, damage of the next one will be doubled.","When evil descends, 25% gain 1 sec Invulnerability."],"stat":null,"attr":[]},{"r":5,"name":["Energy Within 2-5","Magic Shield 2-5","Divine Armor 2-5","Stealth Strike 2-5","Devil\'s Descent 2-5"],"desc":["For every 20 attacks, the armor bursts and PVP reduces damage by 9% for 5 seconds","When the shield disappears, a 30% bonus of 1 second invincibility is added","When the battle armor state exists, the health recovery effect increases by 12% for 5 seconds","After 12 times of Stealth Strike on the current field, damage of the next one will be doubled.","When the demon disappears, 30% of the time, you gain 1 second of invincibility."],"stat":null,"attr":[]},{"r":6,"name":["Energy Within 2-6","Magic Shield 2-6","Divine Armor 2-6","Stealth Strike 2-6","Devil\'s Descent 2-6"],"desc":["For every 20 attacks, the protective body bursts, and PVP reduces damage by 10.5% for 5 seconds","When the shield disappears, a 35% bonus of 1 second invincibility is added","When the battle armor state exists, the health recovery effect increases by 14% for 5 seconds","After 10 times of Stealth Strike on the current field, damage of the next one will be doubled.","When the demon disappears, 35% of the time, you gain 1 second of Invincibility."],"stat":null,"attr":[]},{"r":7,"name":["Energy Within 2-7","Magic Shield 2-7","Divine Armor 2-7","Stealth Strike 2-7","Devil\'s Descent 2-7"],"desc":["For every 20 attacks, the armor bursts and PVP reduces damage by 12% for 5 seconds","When the shield disappears, a 40% bonus of 1 second invincibility is added","When the battle armor state exists, the health recovery effect increases by 16% for 5 seconds","After 8 times of Stealth Strike on the current field, damage of the next one will be doubled.","When the demon disappears, 40% of the time, you gain 1 second of Invulnerability."],"stat":null,"attr":[]}],"maxRank":7},{"id":542,"icon":[1106000,1205000,1306000,1406000,1506000],"q":3,"x":663.0,"y":426.0,"act":[166003],"ranks":[{"r":1,"name":["Energy Within 3-1","Magic Shield 3-1","Divine Armor 3-1","Stealth Strike 3-1","Devil\'s Descent 3-1"],"desc":["Defense increased by 2%","Paralysis Res will be increased by 8% for 5s after casing a Magic Shield.","At the end of the armor battle, the Fatal resistance increases by 0.6% for 5 seconds","There\'s a 20% chance that reduces targets\' DEF by 4%, lasting for 3 seconds.","Additional 5% damage reduction"],"stat":null,"attr":[]},{"r":2,"name":["Energy Within 3-2","Magic Shield 3-2","Divine Armor 3-2","Stealth Strike 3-2","Devil\'s Descent 3-2"],"desc":["Defense increased by 3%","Paralysis Res will be increased by 12% for 5s after casing a Magic Shield.","At the end of the armor battle, the Fatal resistance increases by 0.9% for 5 seconds","There\'s a 20% chance that reduces targets\' DEF by 6%, lasting for 3 seconds.","Additional 6% damage reduction"],"stat":null,"attr":[]},{"r":3,"name":["Energy Within 3-3","Magic Shield 3-3","Divine Armor 3-3","Stealth Strike 3-3","Devil\'s Descent 3-3"],"desc":["Defense increased by 4%","Paralysis Res will be increased by 16% for 5s after casing a Magic Shield.","At the end of the armor battle, the Fatal resistance increases by 1.2% for 5 seconds","There\'s a 20% chance that reduces targets\' DEF by 8%, lasting for 3 seconds.","Additional 7% damage reduction"],"stat":null,"attr":[]},{"r":4,"name":["Energy Within 3-4","Magic Shield 3-4","Divine Armor 3-4","Stealth Strike 3-4","Devil\'s Descent 3-4"],"desc":["Defense increased by 5%","Paralysis Res will be increased by 20% for 5s after casing a Magic Shield.","At the end of the armor battle, the Fatal resistance increases by 1.5% for 5 seconds","There\'s a 20% chance that reduces targets\' DEF by 10%, lasting for 3 seconds.","Additional 9% damage reduction"],"stat":null,"attr":[]},{"r":5,"name":["Energy Within 3-5","Magic Shield 3-5","Divine Armor 3-5","Stealth Strike 3-5","Devil\'s Descent 3-5"],"desc":["Defense increased by 6%","Paralysis Res will be increased by 24% for 5s after casing a Magic Shield.","At the end of the armor battle, the Fatal resistance increases by 1.8% for 5 seconds","There\'s a 20% chance that reduces targets\' DEF by 12%, lasting for 3 seconds","Additional 11% damage reduction"],"stat":null,"attr":[]},{"r":6,"name":["Energy Within 3-6","Magic Shield 3-6","Divine Armor 3-6","Stealth Strike 3-6","Devil\'s Descent 3-6"],"desc":["Defense increased by 7%","Paralysis Res will be increased by 28% for 5s after casing a Magic Shield.","At the end of the armor battle, the Fatal resistance increases by 2.1% for 5 seconds","There\'s a 20% chance that reduces targets\' DEF by 14%, lasting for 3 seconds.","13% additional damage reduction"],"stat":null,"attr":[]},{"r":7,"name":["Energy Within 3-7","Magic Shield 3-7","Divine Armor 3-7","Stealth Strike 3-7","Devil\'s Descent 3-7"],"desc":["Defense increased by 8%","Paralysis Res will be increased by 32% for 5s after casing a Magic Shield.","At the end of the armor battle, the Fatal resistance increases by 2.4% for 5 seconds","There\'s a 20% chance that reduces targets\' DEF by 16%, lasting for 3 seconds.","Additional 15% reduction in damage taken"],"stat":null,"attr":[]}],"maxRank":7},{"id":550,"icon":[1107000,1207000,1307000,1407000,1507000],"q":3,"x":1023.0,"y":1056.0,"act":[135003],"ranks":[{"r":1,"name":["Flaming Sword 1-1","Roar of Ice 1-1","Qi of Infinity 1-1","Clone 1-1","Lightning Vector 1-1"],"desc":["25% deals burn damage to PVP targets based on 1% of their maximum health, lasting for 3 seconds","Ice Roar explodes all ice spikes on the target after storing them for 5 seconds. Each layer of ice spikes can deal 4% magic damage","You and your pet receive a 20% hot blood buff, and critical hits increase by 2% for 3 seconds","Clone gets a Bloodthirst buff after killing a target. Its change of fatal hit will be increased by 0.9% by stacks, 4.5% at most, lasting for 5 seconds.","In PVP combat, 15% chance to weaken target\'s defense by 5% for 3 seconds."],"stat":null,"attr":[]},{"r":2,"name":["Flaming Sword 1-2","Roar of Ice 1-2","Qi of Infinity 1-2","Clone 1-2","Lightning Vector 1-2"],"desc":["25% deals burn damage to PVP targets based on 1.5% of their maximum health, lasting for 3 seconds","Ice Roar explodes all ice spikes on the target after storing them for 5 seconds. Each layer of ice spikes can deal 6% magic damage","You and your pet receive a 20% hot blood buff, and critical hits increase by 3% for 3 seconds","Clone gets a Bloodthirst buff after killing a target. Its change of fatal hit will be increased by 0.9% by stacks, 4.5% at most, lasting for 5 seconds.","In PVP combat, 20% chance to weaken target\'s defense by 7% for 3 seconds."],"stat":null,"attr":[]},{"r":3,"name":["Flaming Sword 1-3","Roar of Ice 1-3","Qi of Infinity 1-3","Clone 1-3","Lightning Vector 1-3"],"desc":["25% deals burn damage to PVP targets based on 2% of their maximum health, lasting for 3 seconds","Ice Roar explodes all ice spikes on the target after storing them for 5 seconds. Each layer of ice spikes can deal 8% magic damage","You and your pet receive a 20% hot blood buff, with a 4% increase in critical hits lasting for 3 seconds","Clone gets a Bloodthirst buff after killing a target. Its change of fatal hit will be increased by 1.2% by stacks, 6% at most, lasting for 5 seconds.","In a PVP battle, weaken target\'s defense by 9% with a 20% chance for 3 seconds."],"stat":null,"attr":[]},{"r":4,"name":["Flaming Sword 1-4","Roar of Ice 1-4","Qi of Infinity 1-4","Clone 1-4","Lightning Vector 1-4"],"desc":["25% deals burn damage to PVP targets based on 2.5% of their maximum health, lasting for 3 seconds. After releasing the skill, the target becomes silent and cannot release it, lasting for 0.8 seconds","Ice Roar explodes all ice spikes on the target after storing them for 5 seconds. Each layer of ice spikes can deal 10% magic damage, and each layer of ice spikes reduces the target\'s movement speed by 4%","You and your pet receive a 20% hot blood BUFF, with a 5% increase in critical hits lasting for 3 seconds. Your attacks stack with true qi, providing a 4% increase in PVP damage per layer of true qi. The maximum limit is 3 layers","Clone gets a Bloodthirst buff after killing a target. Its rate of fatal hit will be increased by 1.5% by stacks, 7.5% at most, lasting for 5 seconds. Its ATK speed will be greatly increased.","In PVP battle, 20% chance to weaken target\'s defense by 11% for 3 seconds; Skill stun target for 0.5 seconds."],"stat":null,"attr":[]},{"r":5,"name":["Flaming Sword 1-5","Roar of Ice 1-5","Qi of Infinity 1-5","Clone 1-5","Lightning Vector 1-5"],"desc":["25% deals a burning damage based on 3% of the target\'s maximum health to PVP targets, lasting for 3 seconds. After releasing the skill, the target becomes silent and cannot release it, lasting for 1.2 seconds","Ice Roar explodes all ice spikes on the target after storing them for 5 seconds. Each layer of ice spikes can deal 12% magic damage, and each layer of ice spikes reduces the target\'s movement speed by 6%","You and your pet receive a 20% hot blood BUFF, with a 6% increase in critical hits lasting for 3 seconds. Your attacks stack with true qi, providing a 6% increase in PVP damage for each layer of true qi. The maximum limit is 3 layers","Clone gets a Bloodthirst buff after killing a target. Its rate of fatal hit will be increased by 1.8% by stacks, 9% at most, lasting for 5 seconds. Its ATK speed will be greatly increased.","In PVP combat, 20% chance to weaken target\'s defense by 13% for 3 seconds; skill stun mark 0.6 seconds."],"stat":null,"attr":[]},{"r":6,"name":["Flaming Sword 1-6","Roar of Ice 1-6","Qi of Infinity 1-6","Clone 1-6","Lightning Vector 1-6"],"desc":["25% deals burn damage to PVP targets based on 3.5% of their maximum health, lasting for 3 seconds. After releasing the skill, the target becomes silent and cannot release it, lasting for 1.6 seconds","Ice Roar explodes all ice spikes on the target after storing them for 5 seconds. Each layer of ice spikes can deal 14% magic damage, and each layer of ice spikes reduces the target\'s movement speed by 8%","You and your pet receive a 20% hot blood BUFF, with a 7% increase in critical hits lasting for 3 seconds. The attack stacks with true qi, providing a PVP damage increase of 8% per layer of true qi. The maximum limit is 3 layers","Clone gets a Bloodthirst buff after killing a target. Its rate of fatal hit will be increased by 2.1% by stacks, 10.5% at most, lasting for 5 seconds. Its ATK speed will be greatly increased.","In PVP combat, 20% chance to weaken target\'s defense by 15% for 3 sec; skill stun mark 0.7 sec."],"stat":null,"attr":[]},{"r":7,"name":["Flaming Sword 1-7","Roar of Ice 1-7","Qi of Infinity 1-7","Clone 1-7","Lightning Vector 1-7"],"desc":["25% deals a burning damage based on 4% of the target\'s maximum health to PVP targets, lasting for 3 seconds. After releasing the skill, the target becomes silent and cannot release it. Lasts for 2 seconds, increasing the chance of a fatal strike to the silent target by 10%","Ice Roar explodes all ice spikes on the target after storing them for 5 seconds. Each layer of ice spikes can deal 16% magic damage. Each layer of ice spikes reduces the target\'s movement speed by 10%, and increases critical damage by 20% when attacking targets with ice spikes","You and the pet 20% get hot blood BUFF, fatal blow enhancement 8% lasts 3 seconds, attack stacking true qi, each layer of true qi to provide PVP injury 10%, cap 3 layers, BUFF end of the release of true qi to enhance the speed of 100 move, lasts 3 seconds!","Clone gets a Bloodthirst buff after killing a target. Its rate of fatal hit will be increased by 2.4% by stacks, 12% at most, lasting for 5 seconds. Its ATK speed will be greatly increased. It will ignore targets\' DEF by 10%. Luck resistance of clones and the character will be increased by 3, lasting for 3 seconds.","In PVP combat, 25% chance to weaken target\'s defense by 15% for 3 seconds; skill stun target 0.8 seconds; after Lightning Vector stuns the target 5 times, the next Lightning Vector will deal 10% of target\'s maximum life damage."],"stat":null,"attr":[]}],"maxRank":7},{"id":551,"icon":[1107000,1207000,1307000,1407000,1507000],"q":3,"x":963.0,"y":888.0,"act":[46003],"ranks":[{"r":1,"name":["Flaming Sword 2-1","Roar of Ice 2-1","Qi of Infinity 2-1","Clone 2-1","Lightning Vector 2-1"],"desc":["For every 20 instances of fire released in the current instance, the damage of the next fire will double","The range has greatly increased, and the target upper limit has been increased by 2","At the end of the state, the movement speed increases by 20 for 5 seconds","Each attack reduces targets\' crit rate by 2%, 6% at most, lasting for 3 seconds.","Each skill reduces the target\'s Tenacity by 2% for 5 seconds, up to 3 levels."],"stat":null,"attr":[]},{"r":2,"name":["Flaming Sword 2-2","Roar of Ice 2-2","Qi of Infinity 2-2","Clone 2-2","Lightning Vector 2-2"],"desc":["The current instance releases 18 flames, and the next time the damage of the flames doubles","The range has greatly increased, and the target upper limit has been increased by 3","At the end of the state, the movement speed increases by 30 for 5 seconds","Each attack reduces targets\' crit rate by 3%, 9% at most, lasting for 3 seconds.","Each skill reduces the target\'s Tenacity by 3% for 5 seconds, up to 3 levels."],"stat":null,"attr":[]},{"r":3,"name":["Flaming Sword 2-3","Roar of Ice 2-3","Qi of Infinity 2-3","Clone 2-3","Lightning Vector 2-3"],"desc":["For every 16 instances of fire released in the current instance, the damage of the next fire will double","The range has greatly increased, and the target upper limit has been increased by 4","At the end of the state, the movement speed increases by 40 for 5 seconds","Each attack reduces targets\' crit rate by 4%, 12% at most, lasting for 3 seconds.","Each skill reduces the target\'s Tenacity by 4% for 5 seconds, up to 3 levels."],"stat":null,"attr":[]},{"r":4,"name":["Flaming Sword 2-4","Roar of Ice 2-4","Qi of Infinity 2-4","Clone 2-4","Lightning Vector 2-4"],"desc":["The current instance releases 14 flames, and the next time the fire damage doubles","The range has greatly increased, and the target upper limit has been increased by 5","At the end of the state, the movement speed increases by 50 for 5 seconds","Each attack reduces targets\' crit rate by 5%, 15% at most, lasting for 3 seconds.","Each skill reduces the target\'s Tenacity by 5% for 5 seconds, up to 3 levels."],"stat":null,"attr":[]},{"r":5,"name":["Flaming Sword 2-5","Roar of Ice 2-5","Qi of Infinity 2-5","Clone 2-5","Lightning Vector 2-5"],"desc":["The current instance releases 12 flames, and the next time the fire damage doubles","The range has greatly increased, and the target upper limit has been increased by 6","At the end of the state, the movement speed increases by 60 for 5 seconds","Each attack reduces targets\' crit rate by 6%, 18% at most, lasting for 3 seconds.","Each skill reduces the target\'s Tenacity by 6% for 5 seconds, up to 3 levels."],"stat":null,"attr":[]},{"r":6,"name":["Flaming Sword 2-6","Roar of Ice 2-6","Qi of Infinity 2-6","Clone 2-6","Lightning Vector 2-6"],"desc":["For every 10 instances of intense fire released in the current instance, the damage from the next instance will double","The range has greatly increased, and the target upper limit has been increased by 7","At the end of the state, the movement speed increases by 70 for 5 seconds","Each attack reduces targets\' crit rate by 7%, 21% at most, lasting for 3 seconds.","Each skill reduces the target\'s Tenacity by 7% for 5 seconds, up to 3 levels."],"stat":null,"attr":[]},{"r":7,"name":["Flaming Sword 2-7","Roar of Ice 2-7","Qi of Infinity 2-7","Clone 2-7","Lightning Vector 2-7"],"desc":["The current instance releases 8 flames, and the next time the fire damage doubles","The range has greatly increased, and the target upper limit has been increased by 8","At the end of the state, the movement speed increases by 80 for 5 seconds","Each attack reduces targets\' crit rate by 8%, 24% at most, lasting for 3 seconds.","Each skill reduces the target\'s Tenacity by 8% for 5 seconds, up to 3 levels."],"stat":null,"attr":[]}],"maxRank":7},{"id":552,"icon":[1107000,1207000,1307000,1407000,1507000],"q":3,"x":843.0,"y":762.0,"act":[29003],"ranks":[{"r":1,"name":["Flaming Sword 3-1","Roar of Ice 3-1","Qi of Infinity 3-1","Clone 3-1","Lightning Vector 3-1"],"desc":["20% reduction in target toughness by 4%, lasting for 3 seconds","6% chance of doubling the duration of the freezing effect","Add 1 lucky resistance for 3 seconds","Clone\'s movement speed will be increased by 20.","For every 15 Thunderbolt releases, the next one causes 3 seconds of stun."],"stat":null,"attr":[]},{"r":2,"name":["Flaming Sword 3-2","Roar of Ice 3-2","Qi of Infinity 3-2","Clone 3-2","Lightning Vector 3-2"],"desc":["20% reduction in target toughness by 6%, lasting for 3 seconds","9% chance of doubling the duration of the freezing effect","Add 2 lucky resists for 3 seconds","Clone\'s movement speed will be increased by 30.","For every 14 Thunderbolt releases, the next one causes a 3-second stun."],"stat":null,"attr":[]},{"r":3,"name":["Flaming Sword 3-3","Roar of Ice 3-3","Qi of Infinity 3-3","Clone 3-3","Lightning Vector 3-3"],"desc":["20% reduction in target toughness by 8%, lasting for 3 seconds","12% chance of doubling the duration of the freezing effect","Add 3 lucky resists for 3 seconds","Clone\'s movement speed will be increased by 40.","Every 13 releases of Thunderbolt, the next one causes 3 seconds of dizziness."],"stat":null,"attr":[]},{"r":4,"name":["Flaming Sword 3-4","Roar of Ice 3-4","Qi of Infinity 3-4","Clone 3-4","Lightning Vector 3-4"],"desc":["20% reduction in target toughness by 10%, lasting for 3 seconds","15% chance of doubling the duration of the freezing effect","Add 4 lucky resists for 3 seconds","Clone\'s movement speed will be increased by 50.","Every 12 Thunderbolt releases, the next one causes 3 seconds of dizziness."],"stat":null,"attr":[]},{"r":5,"name":["Flaming Sword 3-5","Roar of Ice 3-5","Qi of Infinity 3-5","Clone 3-5","Lightning Vector 3-5"],"desc":["20% reduction in target toughness by 12%, lasting for 3 seconds","18% chance of doubling the duration of the freezing effect","Add 5 lucky resists for 3 seconds","Clone\'s movement speed will be increased by 60.","Every 11 Thunderbolt releases, the next one causes 3 seconds of dizziness."],"stat":null,"attr":[]},{"r":6,"name":["Flaming Sword 3-6","Roar of Ice 3-6","Qi of Infinity 3-6","Clone 3-6","Lightning Vector 3-6"],"desc":["20% reduction in target toughness by 14% for 3 seconds","21% chance of doubling the duration of the freezing effect","Add 6 lucky resists for 3 seconds","Clone\'s movement speed will be increased by 70.","Every 10 Thunderbolt releases, the next one causes 3 seconds of dizziness."],"stat":null,"attr":[]},{"r":7,"name":["Flaming Sword 3-7","Roar of Ice 3-7","Qi of Infinity 3-7","Clone 3-7","Lightning Vector 3-7"],"desc":["20% reduction in target toughness by 16% for 3 seconds","24% chance of doubling the duration of the freezing effect","Add 7 lucky resists for 3 seconds","Clone\'s movement speed will be increased by 80.","Every 8 releases of Thunderbolt, the next release causes 3 seconds of stun."],"stat":null,"attr":[]}],"maxRank":7},{"id":560,"icon":[9101000,9202000,9303000,9404000,9505000],"q":3,"x":363.0,"y":1182.0,"act":[98003],"ranks":[{"r":1,"name":["Brutal Stomp 1-1","Fiery Fire 1-1","Dragon Possession 1-1","Swift Arrow 1-1","Phoenix Plume Wind 1-1"],"desc":["Jumping the target will generate a flame that lasts for 5 seconds, causing 1% damage to the target\'s health points that have been damaged","6% chance to release all spinning phoenixes to attack a single target","Deepening trust in linked units, converting 0.4% of damage caused into health points for healing, linking teammates","Skyfin generates a 5-second swamp on its path. The swamp deals damage of 1% of target\'s current HP to enemies.","During the period when Icarus continues to strengthen the archer, 1% of the archer\'s life will be restored every second."],"stat":null,"attr":[]},{"r":2,"name":["Brutal Stomp 1-2","Fiery Fire 1-2","Dragon Possession 1-2","Swift Arrow 1-2","Phoenix Plume Wind 1-2"],"desc":["Jumping the target will generate a flame that lasts for 5 seconds, causing 1.5% damage to the target\'s health that has been damaged","9% chance to release all spinning phoenixes to attack a single target","Link unit trust deepens, causing 0.6% of damage to be converted into health points for healing Link teammates","Skyfin generates a 5-second swamp on its path. The swamp deals damage of 1.5% of target\'s current HP to enemies.","During the period when Icarus continues to strengthen the archer, restores 1.5% of the archer\'s life value per second"],"stat":null,"attr":[]},{"r":3,"name":["Brutal Stomp 1-3","Fiery Fire 1-3","Dragon Possession 1-3","Swift Arrow 1-3","Phoenix Plume Wind 1-3"],"desc":["Jumping the target will generate a flame that lasts for 5 seconds, causing 2% damage to the target\'s health points that have been damaged","12% chance to release all spinning phoenixes to attack a single target","Deepening trust in linked units, converting 0.8% of damage caused into health points for healing, linking teammates","Skyfin generates a 5-second swamp on its path. The swamp deals damage of 2% of target\'s current HP to enemies.","Restores 2% of the archer\'s life value per second while Icarus continues to strengthen the archer"],"stat":null,"attr":[]},{"r":4,"name":["Brutal Stomp 1-4","Fiery Fire 1-4","Dragon Possession 1-4","Swift Arrow 1-4","Phoenix Plume Wind 1-4"],"desc":["Jumping the target will generate a flame that lasts for 5 seconds. The flame will cause 2.5% damage to the target\'s damaged health, significantly increase the attack range, and cause double damage by 2%","15% chance to release all spinning phoenixes to attack a single target, spinning phoenixes spreading their wings increases the mage\'s movement speed by 10%","Link unit trust deepens, 1% of damage dealt is converted into life value to heal linked teammates, increasing the final damage dealt by Taoist by 3%.","Skyfin generates a 5-second swamp on its path. The swamp deals damage of 2.5% of target\'s current HP to enemies. The swamp has 2% chance to paralyze the target for 0.5 seconds.","During continuous strengthening of archer, 2.5% of archer\'s life will be restored every second, and archer\'s attack will hit target with 2% remaining Life damage"],"stat":null,"attr":[]},{"r":5,"name":["Brutal Stomp 1-5","Fiery Fire 1-5","Dragon Possession 1-5","Swift Arrow 1-5","Phoenix Plume Wind 1-5"],"desc":["Jumping the target will generate a flame that lasts for 5 seconds. The flame will cause 3% damage to the target\'s health that has been lost, greatly increasing the attack range and doubling the damage caused by 3%","18% chance to release all spinning phoenixes to attack a single target, spinning phoenixes spreading their wings increases the mage\'s movement speed by 15%","Link unit trust deepens, 1.2% of damage dealt is converted to lifesteal to heal linked teammates, increasing Taoist\'s final damage deepening by 4.5%.","Skyfin generates a 5-second swamp on its path. The swamp deals damage of 3% of target\'s current HP to enemies. The swamp has 3% chance to paralyze the target for 0.5 seconds.","Icarus continues to strengthen the archer, restores 3% of the archer\'s life per second, and the archer\'s attacks take 2.5% of the target\'s remaining life damage"],"stat":null,"attr":[]},{"r":6,"name":["Brutal Stomp 1-6","Fiery Fire 1-6","Dragon Possession 1-6","Swift Arrow 1-6","Phoenix Plume Wind 1-6"],"desc":["Jumping the target will generate a flame that lasts for 5 seconds. The flame will cause 3.5% damage to the target\'s health, significantly increase the attack range, and cause doubling damage by 4%","21% chance to release all spinning phoenixes to attack a single target, spinning phoenixes spreading their wings increases the mage\'s movement speed by 20%","Link unit\'s trust is deepened, 1.4% of damage dealt is converted to lifesteal to heal linked teammates, boosting the Taoist\'s final damage by 6%.","Skyfin generates a 5-second swamp on its path. The swamp deals damage of 3.5% of target\'s current HP to enemies. The swamp has 4% chance to paralyze the target for 0.5 seconds.","Icarus continues to strengthen the archer, restores 3.5% of the archer\'s life per second, and the archer attacks with 3% of the target\'s remaining life damage"],"stat":null,"attr":[]},{"r":7,"name":["Brutal Stomp 1-7","Fiery Fire 1-7","Dragon Possession 1-7","Swift Arrow 1-7","Phoenix Plume Wind 1-7"],"desc":["Jumping target will generate a continuous 5 seconds of flames, the flames continue to cause damage to the target has been lost 4% of the value of life, the attack range is greatly increased, 5% of the damage caused by doubling, the value of less than 30% of the PVP players, there is a 5% probability of decapitation of each other","24% chance to release all spinning phoenixes to attack a single target. The spinning phoenixes spread their wings, increasing the mage\'s movement speed by 25%. Killing the player by 10% can refresh and summon all spinning phoenixes","Link unit trust deepens, 1.6% of damage dealt is converted to lifesteal to heal link teammates, boosting Taoist\'s final damage deepening by 7.5%, summoned beasts have a 20% probability of exploding when killed, inflicting 5% max lifesteal damage to the surrounding area.","Skyfin generates a 5-second swamp on its path. The swamp deals damage of 4% of target\'s current HP to enemies. The swamp has 5% chance to paralyze the target for 0.5 seconds. There\'s a 10% chance to reset Skyfin\'s CD after killing a enemy player.","Icarus restores 3.5% of the archer\'s life per second while the archer is continuously strengthened, and the archer\'s attacks take 3% of the target\'s remaining life damage, as well as gaining 5% PVP damage increase."],"stat":null,"attr":[]}],"maxRank":7},{"id":561,"icon":[9101000,9202000,9303000,9404000,9505000],"q":3,"x":483.0,"y":1014.0,"act":[139003],"ranks":[{"r":1,"name":["Brutal Stomp 2-1","Fiery Fire 2-1","Dragon Possession 2-1","Swift Arrow 2-1","Phoenix Plume Wind 2-1"],"desc":["Kill the player with a 4% chance to reset this skill","Xuan Feng increases damage to the same target by 4% each time","When the Link Summoning Beast exists, the character\'s PVP damage increases by 2% as it deepens","There\'s a 3% chance of dealing double damage.","Kill target 10% chance to get 2% attack power increase in the copy, can be stacked for 3 levels."],"stat":null,"attr":[]},{"r":2,"name":["Brutal Stomp 2-2","Fiery Fire 2-2","Dragon Possession 2-2","Swift Arrow 2-2","Phoenix Plume Wind 2-2"],"desc":["Kill the player with a 6% chance to reset this skill","Xuan Feng increases damage to the same target by 6% each time","When the Link Summoning Beast exists, the character\'s PVP damage increases by 3% as it deepens","There\'s a 4.5% chance of dealing double damage.","Kill target with 10% chance to get 2.5% random attack power increase, can be stacked for 3 levels."],"stat":null,"attr":[]},{"r":3,"name":["Brutal Stomp 2-3","Fiery Fire 2-3","Dragon Possession 2-3","Swift Arrow 2-3","Phoenix Plume Wind 2-3"],"desc":["Kill the player with an 8% chance to reset this skill","Xuan Feng increases damage to the same target by 8% each time","When the Link Summoning Beast exists, the character\'s PVP damage increases by 4% as it deepens","There\'s a 6% chance of dealing double damage.","Kill target with 10% chance to get 3% random attack power increase, can be stacked for 3 levels."],"stat":null,"attr":[]},{"r":4,"name":["Brutal Stomp 2-4","Fiery Fire 2-4","Dragon Possession 2-4","Swift Arrow 2-4","Phoenix Plume Wind 2-4"],"desc":["Kill the player with a 10% chance to reset this skill","Xuan Feng increases damage to the same target by 10% each time","When the Link Summoning Beast exists, the character\'s PVP damage increases by 5% as it deepens","There\'s a 7.5% chance of dealing double damage.","Kill target with 10% chance to get 3.5% random attack power increase, can be stacked for 3 levels."],"stat":null,"attr":[]},{"r":5,"name":["Brutal Stomp 2-5","Fiery Fire 2-5","Dragon Possession 2-5","Swift Arrow 2-5","Phoenix Plume Wind 2-5"],"desc":["Kill the player with a 12% chance to reset this skill","Xuan Feng increases damage to the same target by 12% each time","When the Link Summoning Beast exists, the character\'s PVP damage increases by 6% as it deepens","There\'s a 9% chance of dealing double damage.","Kill target with 10% chance to get 4% random attack power increase, can be stacked for 3 levels."],"stat":null,"attr":[]},{"r":6,"name":["Brutal Stomp 2-6","Fiery Fire 2-6","Dragon Possession 2-6","Swift Arrow 2-6","Phoenix Plume Wind 2-6"],"desc":["Kill the player with a 14% chance to reset this skill","Xuan Feng\'s damage to the same target increases by 14% each time","When the Link Summoning Beast exists, the character\'s PVP damage increases by 7% as it deepens","There\'s a 10.5% chance of dealing double damage.","Kill target with 15% chance to get 4.5% random attack power increase, can be stacked for 3 levels."],"stat":null,"attr":[]},{"r":7,"name":["Brutal Stomp 2-7","Fiery Fire 2-7","Dragon Possession 2-7","Swift Arrow 2-7","Phoenix Plume Wind 2-7"],"desc":["Kill the player with a 16% chance to reset this skill","Xuan Feng inflicts 16% more damage each time on the same target","When the Link Summoning Beast exists, the character\'s PVP damage increases by 8% as it deepens","There\'s a 12% chance of dealing double damage.","20% chance to kill a target to get a 5% random permanent increase in attack power, can be stacked for 3 levels."],"stat":null,"attr":[]}],"maxRank":7},{"id":562,"icon":[9101000,9202000,9303000,9404000,9505000],"q":3,"x":303.0,"y":846.0,"act":[83003],"ranks":[{"r":1,"name":["Brutal Stomp 3-1","Fiery Fire 3-1","Dragon Possession 3-1","Swift Arrow 3-1","Phoenix Plume Wind 3-1"],"desc":["Target player\'s hit rate reduced by 1.2% for 3 seconds","Spinning Phoenix deals 2% splash damage to target position, with a maximum of 2 targets being splashed","Link Summoning Beast increases PVP damage reduction by 20% for every 18 attacks, lasting for 3 seconds","Evasion of enemy player under your attack will be decreased by 1.2%, lasting for 3 seconds.","Attacked player\'s damage increases by 2% for 3 seconds."],"stat":null,"attr":[]},{"r":2,"name":["Brutal Stomp 3-2","Fiery Fire 3-2","Dragon Possession 3-2","Swift Arrow 3-2","Phoenix Plume Wind 3-2"],"desc":["Target player\'s hit rate reduced by 1.8% for 3 seconds","Spinning Phoenix deals 3% splash damage to target position, with a maximum of 2 targets being splashed","Link Summoning Beast increases PVP damage reduction by 20% for every 16 attacks, lasting for 3 seconds","Evasion of enemy player under your attack will be decreased by 1.8%, lasting for 3 seconds.","Attacked player\'s damage increases by 3% for 3 seconds."],"stat":null,"attr":[]},{"r":3,"name":["Brutal Stomp 3-3","Fiery Fire 3-3","Dragon Possession 3-3","Swift Arrow 3-3","Phoenix Plume Wind 3-3"],"desc":["Target player\'s hit rate reduced by 2.4% for 3 seconds","Spinning Phoenix deals 4% splash damage to target position, with a maximum of 2 targets being splashed","Link Summoning Beast increases PVP damage reduction by 20% for every 14 attacks, lasting for 3 seconds","Evasion of enemy player under your attack will be decreased by 2.4%, lasting for 3 seconds.","Attacked player\'s damage increases by 4% for 3 seconds."],"stat":null,"attr":[]},{"r":4,"name":["Brutal Stomp 3-4","Fiery Fire 3-4","Dragon Possession 3-4","Swift Arrow 3-4","Phoenix Plume Wind 3-4"],"desc":["Target player\'s hit rate reduced by 3% for 3 seconds","Spinning Phoenix deals 5% splash damage to target position, with a maximum of 3 targets being splashed","Link Summoning Beast increases PVP damage reduction by 20% for every 12 attacks, lasting for 3 seconds","Evasion of enemy player under your attack will be decreased by 3%, lasting for 3 seconds.","Increase damage by 5% for 3 seconds."],"stat":null,"attr":[]},{"r":5,"name":["Brutal Stomp 3-5","Fiery Fire 3-5","Dragon Possession 3-5","Swift Arrow 3-5","Phoenix Plume Wind 3-5"],"desc":["Target player\'s hit rate reduced by 3.6% for 3 seconds","Spinning Phoenix deals 6% splash damage to target position, with a maximum of 3 targets being splashed","Link Summoning Beast increases PVP damage reduction by 20% for every 10 attacks, lasting for 3 seconds","Evasion of enemy player under your attack will be decreased by 3.6%, lasting for 3 seconds.","Attacked player\'s damage increases by 6% for 3 seconds."],"stat":null,"attr":[]},{"r":6,"name":["Brutal Stomp 3-6","Fiery Fire 3-6","Dragon Possession 3-6","Swift Arrow 3-6","Phoenix Plume Wind 3-6"],"desc":["The hit rate of the target player is reduced by 4.2%, lasting for 3 seconds","Spinning Phoenix deals 7% splash damage to the target position, with a maximum of 3 targets being splashed","Link Summoning Beast increases PVP damage reduction by 20% for every 8 attacks, lasting for 3 seconds","Evasion of enemy player under your attack will be decreased by 4.2%, lasting for 3 seconds.","Attacked player\'s damage increases by 7% for 3 seconds."],"stat":null,"attr":[]},{"r":7,"name":["Brutal Stomp 3-7","Fiery Fire 3-7","Dragon Possession 3-7","Swift Arrow 3-7","Phoenix Plume Wind 3-7"],"desc":["The hit rate of the target player is reduced by 4.8%, lasting for 3 seconds","Spinning Phoenix deals 8% splash damage to the target position, with a maximum of 4 targets being splashed","Link Summoning Beast increases PVP damage reduction by 20% for every 6 attacks, lasting for 3 seconds","Evasion of enemy player under your attack will be decreased by 4.8%, lasting for 3 seconds.","Damage to hit player increases by 8% for 3 seconds."],"stat":null,"attr":[]}],"maxRank":7}]';
const NODES = JSON.parse(RAW_DATA);
const ICON_B64 = {
  "1102000": `${import.meta.env.BASE_URL}icons/1102000.png`,
  "1103000": `${import.meta.env.BASE_URL}icons/1103000.png`,
  "1104000": `${import.meta.env.BASE_URL}icons/1104000.png`,
  "1105000": `${import.meta.env.BASE_URL}icons/1105000.png`,
  "1106000": `${import.meta.env.BASE_URL}icons/1106000.png`,
  "1107000": `${import.meta.env.BASE_URL}icons/1107000.png`,
  "1202000": `${import.meta.env.BASE_URL}icons/1202000.png`,
  "1203000": `${import.meta.env.BASE_URL}icons/1203000.png`,
  "1204000": `${import.meta.env.BASE_URL}icons/1204000.png`,
  "1205000": `${import.meta.env.BASE_URL}icons/1205000.png`,
  "1206000": `${import.meta.env.BASE_URL}icons/1206000.png`,
  "1207000": `${import.meta.env.BASE_URL}icons/1207000.png`,
  "1302000": `${import.meta.env.BASE_URL}icons/1302000.png`,
  "1303000": `${import.meta.env.BASE_URL}icons/1303000.png`,
  "1304000": `${import.meta.env.BASE_URL}icons/1304000.png`,
  "1305000": `${import.meta.env.BASE_URL}icons/1305000.png`,
  "1306000": `${import.meta.env.BASE_URL}icons/1306000.png`,
  "1307000": `${import.meta.env.BASE_URL}icons/1307000.png`,
  "1402000": `${import.meta.env.BASE_URL}icons/1402000.png`,
  "1403000": `${import.meta.env.BASE_URL}icons/1403000.png`,
  "1404000": `${import.meta.env.BASE_URL}icons/1404000.png`,
  "1405000": `${import.meta.env.BASE_URL}icons/1405000.png`,
  "1406000": `${import.meta.env.BASE_URL}icons/1406000.png`,
  "1407000": `${import.meta.env.BASE_URL}icons/1407000.png`,
  "1502000": `${import.meta.env.BASE_URL}icons/1502000.png`,
  "1503000": `${import.meta.env.BASE_URL}icons/1503000.png`,
  "1504000": `${import.meta.env.BASE_URL}icons/1504000.png`,
  "1505000": `${import.meta.env.BASE_URL}icons/1505000.png`,
  "1506000": `${import.meta.env.BASE_URL}icons/1506000.png`,
  "1507000": `${import.meta.env.BASE_URL}icons/1507000.png`,
  "8000000": `${import.meta.env.BASE_URL}icons/8000000.png`,
  "8000001": `${import.meta.env.BASE_URL}icons/8000001.png`,
  "8000002": `${import.meta.env.BASE_URL}icons/8000002.png`,
  "8000006": `${import.meta.env.BASE_URL}icons/8000006.png`,
  "8000007": `${import.meta.env.BASE_URL}icons/8000007.png`,
  "8000008": `${import.meta.env.BASE_URL}icons/8000008.png`,
  "9101000": `${import.meta.env.BASE_URL}icons/9101000.png`,
  "9202000": `${import.meta.env.BASE_URL}icons/9202000.png`,
  "9303000": `${import.meta.env.BASE_URL}icons/9303000.png`,
  "9404000": `${import.meta.env.BASE_URL}icons/9404000.png`,
  "9505000": `${import.meta.env.BASE_URL}icons/9505000.png`,
  "n-q2-active": `${import.meta.env.BASE_URL}icons/n-q2-active.png`,
  "decrease-btn": `${import.meta.env.BASE_URL}icons/decrease-btn.png`,
  "n3": `${import.meta.env.BASE_URL}icons/n3.png`,
  "n4": `${import.meta.env.BASE_URL}icons/n4.png`,
  "n8": `${import.meta.env.BASE_URL}icons/n8.png`,
  "nebula-attr-deco": `${import.meta.env.BASE_URL}icons/nebula-attr-deco.png`,
  "nebula-name-bg": `${import.meta.env.BASE_URL}icons/nebula-name-bg.png`,
  "nebula-skill-desc-bg3": `${import.meta.env.BASE_URL}icons/nebula-skill-desc-bg3.png`,
  "nebula-skill-desc-next-arrow": `${import.meta.env.BASE_URL}icons/nebula-skill-desc-next-arrow.png`,
  "nebula-skill-panel-bg": `${import.meta.env.BASE_URL}icons/nebula-skill-panel-bg.png`,
  "nebula-skill-panel-inner-bg": `${import.meta.env.BASE_URL}icons/nebula-skill-panel-inner-bg.png`,
  "nebula-value-bg": `${import.meta.env.BASE_URL}icons/nebula-value-bg.png`,
  "undo-btn": `${import.meta.env.BASE_URL}icons/undo-btn.png`,
  "1306000_0": `${import.meta.env.BASE_URL}icons/1306000_0.png`,
  "1207000_0": `${import.meta.env.BASE_URL}icons/1207000_0.png`,
  "1303000_0": `${import.meta.env.BASE_URL}icons/1303000_0.png`,
  "n-q1-active": `${import.meta.env.BASE_URL}icons/n-q1-active.png`,
  "node-select-highlight": `${import.meta.env.BASE_URL}icons/node-select-highlight.png`,
  "1102000_0": `${import.meta.env.BASE_URL}icons/1102000_0.png`,
  "9505000_0": `${import.meta.env.BASE_URL}icons/9505000_0.png`,
  "1206000_0": `${import.meta.env.BASE_URL}icons/1206000_0.png`,
  "n7": `${import.meta.env.BASE_URL}icons/n7.png`,
  "8000007_0": `${import.meta.env.BASE_URL}icons/8000007_0.png`,
  "8000006_0": `${import.meta.env.BASE_URL}icons/8000006_0.png`,
  "n5": `${import.meta.env.BASE_URL}icons/n5.png`,
  "1403000_0": `${import.meta.env.BASE_URL}icons/1403000_0.png`,
  "8000000_0": `${import.meta.env.BASE_URL}icons/8000000_0.png`,
  "1402000_0": `${import.meta.env.BASE_URL}icons/1402000_0.png`,
  "1202000_0": `${import.meta.env.BASE_URL}icons/1202000_0.png`,
  "warrior": `${import.meta.env.BASE_URL}icons/warrior.png`,
  "n-q2-inactive": `${import.meta.env.BASE_URL}icons/n-q2-inactive.png`,
  "nebula-center-seven-bg": `${import.meta.env.BASE_URL}icons/nebula-center-seven-bg.png`,
  "nebula-bg": `${import.meta.env.BASE_URL}icons/nebula-bg.png`,
  "max-btn": `${import.meta.env.BASE_URL}icons/max-btn.png`,
  "9404000_0": `${import.meta.env.BASE_URL}icons/9404000_0.png`,
  "1504000_0": `${import.meta.env.BASE_URL}icons/1504000_0.png`,
  "taoist_0": `${import.meta.env.BASE_URL}icons/taoist_0.png`,
  "n1": `${import.meta.env.BASE_URL}icons/n1.png`,
  "1305000_0": `${import.meta.env.BASE_URL}icons/1305000_0.png`,
  "1205000_0": `${import.meta.env.BASE_URL}icons/1205000_0.png`,
  "1106000_0": `${import.meta.env.BASE_URL}icons/1106000_0.png`,
  "9303000_0": `${import.meta.env.BASE_URL}icons/9303000_0.png`,
  "assassin_0": `${import.meta.env.BASE_URL}icons/assassin_0.png`,
  "n2": `${import.meta.env.BASE_URL}icons/n2.png`,
  "1506000_0": `${import.meta.env.BASE_URL}icons/1506000_0.png`,
  "reset-btn": `${import.meta.env.BASE_URL}icons/reset-btn.png`,
  "mage": `${import.meta.env.BASE_URL}icons/mage.png`,
  "1507000_0": `${import.meta.env.BASE_URL}icons/1507000_0.png`,
  "warrior_0": `${import.meta.env.BASE_URL}icons/warrior_0.png`,
  "1407000_0": `${import.meta.env.BASE_URL}icons/1407000_0.png`,
  "archer_0": `${import.meta.env.BASE_URL}icons/archer_0.png`,
  "assassin": `${import.meta.env.BASE_URL}icons/assassin.png`,
  "n-q1-inactive": `${import.meta.env.BASE_URL}icons/n-q1-inactive.png`,
  "1104000_0": `${import.meta.env.BASE_URL}icons/1104000_0.png`,
  "increase-btn": `${import.meta.env.BASE_URL}icons/increase-btn.png`,
  "8000001_0": `${import.meta.env.BASE_URL}icons/8000001_0.png`,
  "taoist": `${import.meta.env.BASE_URL}icons/taoist.png`,
  "min-btn": `${import.meta.env.BASE_URL}icons/min-btn.png`,
  "1103000_0": `${import.meta.env.BASE_URL}icons/1103000_0.png`,
  "1503000_0": `${import.meta.env.BASE_URL}icons/1503000_0.png`,
  "1203000_0": `${import.meta.env.BASE_URL}icons/1203000_0.png`,
  "archer": `${import.meta.env.BASE_URL}icons/archer.png`,
  "8000002_0": `${import.meta.env.BASE_URL}icons/8000002_0.png`,
  "1405000_0": `${import.meta.env.BASE_URL}icons/1405000_0.png`,
  "1502000_0": `${import.meta.env.BASE_URL}icons/1502000_0.png`,
  "1105000_0": `${import.meta.env.BASE_URL}icons/1105000_0.png`,
  "1307000_0": `${import.meta.env.BASE_URL}icons/1307000_0.png`,
  "1304000_0": `${import.meta.env.BASE_URL}icons/1304000_0.png`,
  "1404000_0": `${import.meta.env.BASE_URL}icons/1404000_0.png`,
  "n-q3-inactive": `${import.meta.env.BASE_URL}icons/n-q3-inactive.png`,
  "n6": `${import.meta.env.BASE_URL}icons/n6.png`,
  "n-q3-active": `${import.meta.env.BASE_URL}icons/n-q3-active.png`,
  "mage_0": `${import.meta.env.BASE_URL}icons/mage_0.png`,
  "1406000_0": `${import.meta.env.BASE_URL}icons/1406000_0.png`,
  "8000008_0": `${import.meta.env.BASE_URL}icons/8000008_0.png`,
  "1107000_0": `${import.meta.env.BASE_URL}icons/1107000_0.png`,
  "nebula-skill-point": `${import.meta.env.BASE_URL}icons/nebula-skill-point.png`,
  "9202000_0": `${import.meta.env.BASE_URL}icons/9202000_0.png`,
  "1204000_0": `${import.meta.env.BASE_URL}icons/1204000_0.png`,
  "1302000_0": `${import.meta.env.BASE_URL}icons/1302000_0.png`,
  "9101000_0": `${import.meta.env.BASE_URL}icons/9101000_0.png`,
  "1505000_0": `${import.meta.env.BASE_URL}icons/1505000_0.png`,
  "detail-panel-bg": `${import.meta.env.BASE_URL}icons/detail-panel-bg.png`,
  "n-link-active": `${import.meta.env.BASE_URL}icons/n-link-active.png`,
  "n-link-inactive": `${import.meta.env.BASE_URL}icons/n-link-inactive.png`,
  "nebula-state-detail-btn": `${import.meta.env.BASE_URL}icons/nebula-state-detail-btn.png`,
  "nebula-detail-divider": `${import.meta.env.BASE_URL}icons/nebula-detail-divider.png`,
  "nebula-detail-panel-bg": `${import.meta.env.BASE_URL}icons/nebula-detail-panel-bg.png`
};
function iconHref(iconId, active) {
  const key = active ? String(iconId) : String(iconId) + "_0";
  const b64 = ICON_B64[key];
  return b64 || null;
}
function borderHref(quality, active) {
  const q = quality === 3 ? "q3" : quality === 2 ? "q2" : "q1";
  const key = `n-${q}-${active ? "active" : "inactive"}`;
  const b64 = ICON_B64[key];
  return b64 || null;
}
function assetHref(key) {
  const b64 = ICON_B64[key];
  return b64 || null;
}


const TYPE_LABELS = {
  2: "HP", 3: "MP", 5: "Min DEF", 6: "Max DEF", 11: "HP AMP", 12: "ATK AMP",
  13: "Paralysis Chance", 14: "Paralysis RES", 17: "Crit DMG Up", 21: "PVP DMG Up",
  22: "PVP DMG Down", 67: "Fatal Blow", 68: "Fatal DMG Up", 69: "Fatal DMG Down",
  78: "Crit DMG Down", 141: "Min ATK", 142: "Max ATK", 151: "Fixed DMG", 152: "Fixed DEF",
  153: "EVA", 154: "ACC", 189: "Warrior DMG Down", 190: "Mage DMG Down", 191: "Taoist DMG Down",
  192: "DMG Up vs Warrior", 193: "DMG Up vs Mage", 194: "DMG Up vs Taoist", 196: "DEF AMP",
  197: "Respawn RES", 205: "Deadly reduction", 220: "Lucky Damage Bonus", 221: "Lucky Damage Reduction",
};

// Stats stored as raw integers representing hundredths of a percent (e.g.
// 150 -> 1.5%). Confirmed against real screenshot values: ATK AMP raw 100
// -> 1%, PVP DMG Up raw 250 -> 2.5%, Warrior DMG Down raw 150 -> 1.5%, all
// exact matches. Crit DMG Up/Down (17, 78) are flat despite similar raw
// magnitude to these - confirmed flat via screenshot ("Crit DMG Up+300",
// no % sign). Everything not in this set is displayed as a flat number.
const PERCENT_TYPES = new Set([11,12,13,14,21,22,67,68,69,153,154,189,190,191,192,193,194,196,197,205,220,221]);

function formatStatValue(type, value) {
  if (PERCENT_TYPES.has(type)) {
    const pct = value / 100;
    return `${pct % 1 === 0 ? pct : pct.toFixed(1)}%`;
  }
  return `${value}`;
}

// ─────────────────────────────────────────────────────────────────────────
// PRESET BUILDS - beginner/suggested talent guides.
// This is the section to edit if you want to add, remove, or change guides.
// Each guide is a named, ordered list of steps; each step says "invest
// points in this node up to this rank". Steps are applied in order, and
// automatically path through any prerequisites in between (you don't need
// to list prereq nodes yourself - just the nodes that actually matter).
//
// HOW TO FIND A NODE'S ID: click any node in the tree - the detail panel
// shows "Node #123". Use that number as nodeId below.
//
// classIdx: 0 = Warrior, 1 = Mage, 2 = Taoist, 3 = Assassin, 4 = Archer
// rank: how many points that node should end up with (its max rank is
//   shown in the detail panel too, e.g. "Rank 0/7" means max is 7).
// label: short text shown as a tooltip on that step's numbered badge.
// badge: optional - overrides what the numbered badge on the map shows
//   (e.g. "*" for an optional/situational step). Defaults to the step's
//   position in the list (1, 2, 3...) if not set.
// ─────────────────────────────────────────────────────────────────────────
// Presets are still a work in progress - set to true to bring the guide
// selector/button/badges back once ready. Data and logic below are untouched,
// this just gates whether the UI shows up.
const PRESETS_ENABLED = true;
// Stable reference for classes with no allocations yet - `{}` as an inline
// fallback creates a NEW object every render, which breaks anything that
// depends on `allocated`'s identity staying stable across renders (like
// useEffect dependency arrays) for untouched classes.
const EMPTY_ALLOCATED = {};

const PRESET_BUILDS = [
  {
    id: "mage_newbie",
    name: "Mage - Starter Build",
    classIdx: 1,
    steps: [
      { nodeId: 510, rank: 7, label: "Max this one out for Silence. Most important node you have." },
      {
        nodeId: 551,
        rank: 1,
        badge: "*",
        label:
          "Optional to put 1-2 points in this if you want extra range, wasting points if you put in more so dont max it.",
      },
      { nodeId: 552, rank: 7, badge: "2", label: "Max this for more freeze duration." },
      { nodeId: 512, rank: 7, badge: "3", label: "More paralyze, max to be more annoying." },
    ],
  },
  {
    id: "warrior_newbie",
    name: "Warrior - Starter Build",
    classIdx: 0,
    steps: [
      {
        nodeId: 502,
        rank: 7,
        label: "Max this for everyday farming. After that you can choose either 2 or 3 first, both are great.",
      },
      {
        nodeId: 560,
        rank: 7,
        label:
          "When you have totem unlocked this is by far the best boss killer skill you will have. Max it and enjoy.",
      },
      { nodeId: 550, rank: 7, label: "Great for PvP. Ouch and Silence." },
    ],
  },
  {
    id: "archer_newbie",
    name: "Archer - Starter Build",
    classIdx: 4,
    steps: [
      { nodeId: 502, rank: 7, label: "Based on others, this is good to get first." },
      { nodeId: 512, rank: 7, label: "This is the second go-to." },
      { nodeId: 501, rank: 7, label: "More precision shot, what could go wrong." },
    ],
  },
  {
    id: "assassin_newbie",
    name: "Assassin - Starter Build",
    classIdx: 3,
    steps: [
      { nodeId: 502, rank: 7, label: "Max this for everyday farming." },
      {
        nodeId: 540,
        rank: 7,
        label: "Damage based on current hp% which is not that bad, but also a stun. And stun is nice.",
      },
    ],
  },
  {
    id: "taoist_newbie",
    name: "Taoist - Starter Build",
    classIdx: 2,
    steps: [
      {
        nodeId: 512,
        rank: 6,
        label:
          "This you dont want to max, ever. Does insane splash damage as long as you keep it lvl 1-6. Do. Not. Max.",
      },
      { nodeId: 510, rank: 7, label: "Another good Soul Amulet node to get." },
      { nodeId: 502, rank: 7, label: "More healing is nice, and cheap to get." },
    ],
  },
];

const CLASSES = [
  { id: 0, name: "Warrior",  accent: "#c0392b" },
  { id: 1, name: "Mage",     accent: "#3b82c4" },
  { id: 2, name: "Taoist",   accent: "#4c9a6b" },
  { id: 3, name: "Assassin", accent: "#8b5fbf" },
  { id: 4, name: "Archer",   accent: "#c79a3f" },
];

const GOLD = "#f3aa40";
const BRONZE = "#d8a252";
const MUTED = "#aba079";
const BRIGHT = "#eee6d2";
const LOCKED = "#4a443d";
const PANEL_BG = "#221b16";
const CANVAS_BG = "#15100c";
const DEFAULT_POOL = 120;

function nodeById(id) {
  return NODES.find((n) => n.id === id);
}

// No floppy-disk/trash-bin icons exist in the game's own UI asset set (it's
// a fantasy MMO icon sheet, not generic desktop icons) - drawn by hand
// instead, sized/styled to match the existing min/max button icons
// (currentColor so they inherit the button's text color automatically).
// Solid-filled rather than outlined, to match the min/max icons' weight.
function SaveIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path
        d="M5 3h11l5 5v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"
        fill="currentColor"
      />
      <rect x="8" y="3" width="8" height="5" fill="#1a1512" opacity="0.55" />
      <rect x="7" y="13" width="10" height="7" fill="#1a1512" opacity="0.55" />
    </svg>
  );
}
function TrashIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <rect x="9" y="1.5" width="6" height="2.2" rx="0.6" fill="currentColor" />
      <rect x="4" y="5.2" width="16" height="2" rx="0.6" fill="currentColor" />
      <path d="M5.5 8h13l-1.1 12.4a2 2 0 0 1-2 1.8H8.6a2 2 0 0 1-2-1.8L5.5 8z" fill="currentColor" />
    </svg>
  );
}
function RouteIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <circle cx="4" cy="19" r="2.2" fill="currentColor" />
      <circle cx="11" cy="12" r="2.2" fill="currentColor" />
      <circle cx="15" cy="16" r="1.8" fill="currentColor" opacity="0.85" />
      <path d="M5.6 17.4 9.6 13.6" stroke="currentColor" strokeWidth="1.6" strokeDasharray="1 2.4" strokeLinecap="round" />
      <path d="M12.6 13.2 14 14.6" stroke="currentColor" strokeWidth="1.6" strokeDasharray="1 2.4" strokeLinecap="round" />
      <path d="M15.5 14.5 20 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 5.5 15.8 6.8 19 9z" fill="currentColor" />
    </svg>
  );
}
function ZoomIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <circle cx="10.2" cy="10.2" r="7.2" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="10.2" cy="10.2" r="4.9" fill="none" stroke="currentColor" strokeWidth="0.9" opacity="0.4" />
      <path
        d="M6.6 8.4a4.6 4.6 0 0 1 3.9-3.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.75"
      />
      <path d="M15.3 15.3 21 21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect
        x="17.6"
        y="17.6"
        width="2.2"
        height="4.6"
        rx="1.1"
        fill="#1a1512"
        opacity="0.35"
        transform="rotate(45 18.7 19.9)"
      />
    </svg>
  );
}

function isKeystone(n) {
  return n.icon.length === 5;
}

// Does this node grant the given stat type at any of its ranks? Used by
// the "Show all" highlight feature to find every other node sharing the
// same stat as the one currently selected.
function nodeGrantsType(n, type) {
  if (type == null) return false;
  return (n.ranks || []).some((r) => (r.attr || []).some((a) => a.type === type));
}

function unlockCondition(n, allocated) {
  if (!n.act || n.act.length === 0) return true;
  return n.act.some((packed) => {
    const targetId = Math.round(packed / 1000);
    const requiredRank = packed % 1000;
    const cur = allocated[targetId] || 0;
    return cur >= requiredRank;
  });
}

function nodeRadius(n) {
  if (isKeystone(n)) return 22; // keystones are always quality 3 (7 levels) in this dataset
  if (n.q === 2) return 15.5; // 5 levels - roughly midway between 3-level and keystone
  return 9; // quality 1, 3 levels
}

// Extracts the "skill slot" number (e.g. 02, 03...) from a keystone's icon
// id for sorting - e.g. 1102000 -> slot 2. Falls back to node id for
// non-keystone nodes, which don't have a meaningful slot concept.
function skillSlot(n) {
  if (isKeystone(n)) {
    const classIcon = n.icon.find((ic) => [11, 12, 13, 14, 15].includes(Math.floor(ic / 100000)));
    if (classIcon) return Math.floor(classIcon / 1000) % 100;
  }
  return n.id;
}

// Sums every attr type across every node's *current* rank - each rank's
// attr value is already the cumulative total at that rank, not additive
// per rank, so we only read the currently-allocated rank per node.
// Returns entries sorted by total descending (HP first in practice).
// Display order for the Build Summary Stats list. Lower number = shown
// first. 141/142 (Min/Max ATK) double as Min/Max Magic/Tao depending on
// class - same stat type, so same priority either way. Anything not listed
// here (a handful of stats that don't come up often) falls after these in
// STAT_ORDER_FALLBACK, in no particular priority - move into the main list
// above if you want one of them ranked specifically.
const STAT_ORDER = [
  11, 2, // HP%, HP
  3, // MP
  12, // ATK%
  142, // Max ATK/Magic/Tao
  141, // Min ATK/Magic/Tao
  196, // DEF%
  6, // Max DEF
  5, // Min DEF
  21, // PVP DMG Up
  22, // PVP DMG Down
  68, // Fatal DMG Up
  67, // Fatal Blow
  69, // Fatal DMG Down
  205, // Deadly reduction
  17, // Crit DMG Up
  78, // Crit DMG Down
  192, // DMG Up vs Warrior
  189, // Warrior DMG Down
  193, // DMG Up vs Mage
  190, // Mage DMG Down
  194, // DMG Up vs Taoist
  191, // Taoist DMG Down
  220, // Lucky Damage Bonus
  221, // Lucky Damage Reduction
];
const STAT_ORDER_FALLBACK = [13, 14, 153, 154, 197, 151, 152];
const STAT_PRIORITY = new Map(
  [...STAT_ORDER, ...STAT_ORDER_FALLBACK].map((type, i) => [type, i])
);

// Min/Max ATK (types 141/142) are labeled per-class in the real data too -
// Mage sees "Min/Max Magic", Taoist sees "Min/Max Tao", everyone else sees
// "Min/Max ATK". Confirmed directly against the source skill data.
const CLASS_STAT_LABELS = {
  141: ["Min ATK", "Min Magic", "Min Tao", "Min ATK", "Min ATK"],
  142: ["Max ATK", "Max Magic", "Max Tao", "Max ATK", "Max ATK"],
};

function allStatTotals(allocated, classIdx) {
  const totals = {};
  for (const [idStr, rank] of Object.entries(allocated)) {
    if (rank <= 0) continue;
    const n = nodeById(Number(idStr));
    if (!n) continue;
    const rankData = n.ranks[Math.min(rank, n.ranks.length) - 1];
    for (const a of rankData?.attr || []) {
      totals[a.type] = (totals[a.type] || 0) + a.value;
    }
  }
  return Object.entries(totals)
    .map(([type, value]) => ({
      type: Number(type),
      label: CLASS_STAT_LABELS[type]?.[classIdx] || TYPE_LABELS[type] || `Stat ${type}`,
      value,
      display: formatStatValue(Number(type), value),
    }))
    .sort((a, b) => {
      const pa = STAT_PRIORITY.has(a.type) ? STAT_PRIORITY.get(a.type) : 999;
      const pb = STAT_PRIORITY.has(b.type) ? STAT_PRIORITY.get(b.type) : 999;
      return pa - pb;
    });
}

// The 7 constellation nodes at the center of the tree - real ids/names/icon
// paths and position formula pulled directly from the game's source, but
// the level-up cost table itself hasn't been recovered yet, so leveling
// here is free-form (no resource cost checked) until that data is found.
const STAR_NAMES = ["Dubhe", "Merak", "Phecda", "Megrez", "Alioth", "Mizar", "Alkaid"];
const STAR_CENTER = { x: 531, y: 654 };
const STAR_RADIUS = 90;
const STAR_IDS = [1000, 2000, 3000, 4000, 5000, 6000, 7000];

function starPosition(c) {
  // c is 1-7. The background art doesn't perfectly follow either a plain
  // circle or the site's own position formula uniformly across all 7 spots
  // (likely hand-placed/drawn rather than purely generated) - empirically,
  // the plain circle matches n1, n3, n4, n5, n6, while only n2 and n7 needed
  // the formula-derived (elliptical) position instead. Mixed per point
  // rather than picking one formula for all seven, plus small manual nudges
  // on top where the fit still isn't quite exact.
  const angle = (2 * Math.PI * (c - 1)) / 7 - Math.PI / 2;
  let x, y;
  if (c === 2 || c === 7) {
    const leftPct = -0.1 + 10.152 * Math.cos(angle);
    const topPct = 10.4 + 9.4 * 0.95 * Math.sin(angle);
    const nx = (leftPct - -0.1) / 9.897468164469872;
    const ny = (topPct - 9.957825995184301) / 8.487825995184302;
    x = STAR_CENTER.x + STAR_RADIUS * nx;
    y = STAR_CENTER.y + STAR_RADIUS * ny;
  } else {
    x = STAR_CENTER.x + STAR_RADIUS * Math.cos(angle);
    y = STAR_CENTER.y + STAR_RADIUS * Math.sin(angle);
  }

  if (c === 1) {
    x -= 1;
    y += 5;
  }
  if (c === 2 || c === 7) {
    // pull 5 units inward, toward STAR_CENTER, along its current direction
    const dx = STAR_CENTER.x - x;
    const dy = STAR_CENTER.y - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    x += (dx / dist) * 5;
    y += (dy / dist) * 5;
  }
  if (c === 7) {
    // small additional nudge southwest (2 units total, split evenly)
    x -= 1.41;
    y += 1.41;
  }

  return { x, y };
}

// Encodes a build (class, allocated points, star levels) into a compact
// string safe for a URL hash - not human-readable, just short. Packs each
// allocated node as a single base36 number (nodeId*10 + rank, since ranks
// never exceed 9), and all 7 star levels as fixed-width base36 pairs so no
// separators are needed for that part.
function encodeBuild(classIdx, allocated, starLevels) {
  const classPart = classIdx.toString(36);
  const starsPart = STAR_IDS.map((id) => (starLevels[id] || 0).toString(36).padStart(2, "0")).join("");
  const allocPairs = Object.entries(allocated)
    .filter(([, r]) => r > 0)
    .map(([id, r]) => (Number(id) * 10 + r).toString(36))
    .join(".");
  return `${classPart}${starsPart}~${allocPairs}`;
}

function decodeBuild(str) {
  try {
    const [head, allocPart] = str.split("~");
    const classIdx = parseInt(head[0], 36);
    if (!Number.isFinite(classIdx) || classIdx < 0 || classIdx > 4) return null;
    const starsHex = head.slice(1);
    const starLevels = {};
    for (let i = 0; i < STAR_IDS.length; i++) {
      const chunk = starsHex.slice(i * 2, i * 2 + 2);
      const level = parseInt(chunk, 36) || 0;
      if (level > 0) starLevels[STAR_IDS[i]] = level;
    }
    const allocated = {};
    if (allocPart) {
      for (const p of allocPart.split(".")) {
        if (!p) continue;
        const packed = parseInt(p, 36);
        if (!Number.isFinite(packed)) continue;
        const nodeId = Math.floor(packed / 10);
        const rank = packed % 10;
        allocated[nodeId] = rank;
      }
    }
    return { classIdx, allocated, starLevels };
  } catch {
    return null;
  }
}

function starLevelLabel(level) {
  if (level <= 0) return "T0";
  const tier = Math.floor((level - 1) / 7) + 1;
  const sub = ((level - 1) % 7) + 1;
  return `T${tier}-${sub}`;
}

// Computes the cheapest OR-branch plan to reach every relevant (nodeId, rank)
// state, given a fixed base allocation. Returns { dist, need } maps keyed by
// "id:rank".
//
// Earlier version used a DFS with a per-branch "visiting" cycle guard. That
// correctly avoided infinite recursion on real cycles in the data (e.g.
// nodes 41 <-> 62 reference each other as alternatives), but it memoized
// results that were only valid within one specific search context - so a
// node's cost computed while temporarily blocked by an unrelated ancestor's
// cycle guard got cached as artificially expensive (or Infinity) and reused
// incorrectly elsewhere, silently picking a longer path (e.g. routing
// through node 131 instead of the actually-cheaper node 41 for node 520).
//
// This version solves it as a shortest-path problem via relaxation
// (Bellman-Ford style). Since every edge weight (a node's own rank cost) is
// non-negative, going around a cycle can only add cost, never reduce it, so
// relaxation naturally finds the true optimum without needing any explicit
// cycle guard at all - and the result is a single, context-free table valid
// everywhere, so there's no possibility of stale/poisoned entries.
// Computes, for every node, the cheapest cost (and resulting allocation
// plan) to satisfy that node's OWN prerequisite condition - independent of
// what rank you actually want that node at. This is the key property that
// makes arbitrary-rank queries possible: cost to bring node `id` up to any
// rank R is just prereqCost[id] + max(0, R - current[id]), since satisfying
// id's prerequisites doesn't depend on which rank of id you're after -
// it's a fixed one-time unlock cost. Solved via relaxation (Bellman-Ford
// style): non-negative edge weights mean cycles in the data (e.g. nodes 41
// and 62 reference each other) can never help, so no cycle guard is needed
// and the result is a single context-free table valid everywhere.
function solvePlans(baseAllocated) {
  const prereqCost = new Map();
  const prereqNeed = new Map();

  for (const n of NODES) {
    if (!n.act || n.act.length === 0) {
      prereqCost.set(n.id, 0);
      prereqNeed.set(n.id, {});
    } else {
      prereqCost.set(n.id, Infinity);
      prereqNeed.set(n.id, null);
    }
  }

  const edgeCost = (tid, treq) => {
    const cur = baseAllocated[tid] || 0;
    if (cur >= treq) return { cost: 0, need: {} };
    const pc = prereqCost.get(tid);
    if (!Number.isFinite(pc)) return { cost: Infinity, need: null };
    const need = { ...prereqNeed.get(tid) };
    need[tid] = Math.max(need[tid] || 0, treq);
    return { cost: pc + (treq - cur), need };
  };

  let changed = true;
  while (changed) {
    changed = false;
    for (const n of NODES) {
      if (!n.act || n.act.length === 0) continue;
      let best = Infinity;
      let bestNeed = null;
      for (const packed of n.act) {
        const tid = Math.round(packed / 1000);
        const treq = packed % 1000;
        const e = edgeCost(tid, treq);
        if (e.cost < best) {
          best = e.cost;
          bestNeed = e.need;
        }
      }
      if (best < prereqCost.get(n.id)) {
        prereqCost.set(n.id, best);
        prereqNeed.set(n.id, bestNeed);
        changed = true;
      }
    }
  }

  return {
    costForRank(id, rank) {
      const cur = baseAllocated[id] || 0;
      if (cur >= rank) return 0;
      const pc = prereqCost.get(id);
      if (!Number.isFinite(pc)) return Infinity;
      return pc + (rank - cur);
    },
    needForRank(id, rank) {
      const cur = baseAllocated[id] || 0;
      if (cur >= rank) return {};
      const pc = prereqCost.get(id);
      if (!Number.isFinite(pc)) return null;
      const need = { ...prereqNeed.get(id) };
      need[id] = Math.max(need[id] || 0, rank);
      return need;
    },
  };
}

// Dry-run: cost to bring a node to a given rank via the cheapest path,
// without mutating. Defaults to the node's own max rank.
function pathCostToRank(node, allocated, rank = node.maxRank) {
  return solvePlans(allocated).costForRank(node.id, rank);
}

// Applies the cheapest path to bring a node to a given rank, returns the
// new allocation map. Defaults to the node's own max rank.
function applyPathToRank(node, allocated, rank = node.maxRank) {
  const plan = solvePlans(allocated).needForRank(node.id, rank);
  const next = { ...allocated };
  for (const [id, r] of Object.entries(plan || {})) {
    next[id] = Math.max(next[id] || 0, r);
  }
  return next;
}

// Computes which currently-allocated nodes are actually reachable from a
// true root given a fixed allocation snapshot - see cascadeRemove for why
// this has to be forward reachability rather than a "still looks
// satisfied" recheck (the data has real cycles that can self-sustain
// under the weaker check).
function computeValidSet(working) {
  const valid = new Set();
  for (const n of NODES) {
    if ((working[n.id] || 0) > 0 && (!n.act || n.act.length === 0)) valid.add(n.id);
  }
  let changed = true;
  while (changed) {
    changed = false;
    for (const n of NODES) {
      const cur = working[n.id] || 0;
      if (cur <= 0 || valid.has(n.id)) continue;
      if (!n.act || n.act.length === 0) continue;
      const ok = n.act.some((packed) => {
        const tid = Math.round(packed / 1000);
        const treq = packed % 1000;
        return valid.has(tid) && (working[tid] || 0) >= treq;
      });
      if (ok) {
        valid.add(n.id);
        changed = true;
      }
    }
  }
  return valid;
}

// Zeroes out a node, cascading to remove points from anything that's no
// longer validly connected to the start as a result.
//
// This has to be a forward reachability sweep, not a "recheck each node's
// condition against current state" loop - the data has real cycles (e.g.
// nodes 67, 164, 155, and 520 can each point at one of the others as a
// valid alternative), and a cluster like that can prop itself up forever
// under a "still looks satisfied" check even after its only real anchor to
// the rest of the tree is gone, since each member always finds some other
// member of the same cluster still allocated to point at.
//
// The fix: start with NOTHING proven valid, then only promote a node to
// valid if it has no prerequisites (a true root) or at least one
// alternative is ALREADY proven valid - repeat until nothing new is
// promoted. A self-referential cluster with no real external anchor can
// never get its first member promoted this way, so it correctly falls out
// instead of surviving indefinitely.
function cascadeRemove(nodeId, allocated) {
  const working = { ...allocated };
  working[nodeId] = 0;
  const valid = computeValidSet(working);
  for (const n of NODES) {
    if ((working[n.id] || 0) > 0 && !valid.has(n.id)) working[n.id] = 0;
  }
  return working;
}

const SAVE_KEY = "talentTreeBuild:v1";

// Defensive wrapper: localStorage is unavailable/throws in some sandboxed
// preview environments (e.g. Claude's artifact preview), but works normally
// on a real deployed site. Everything here silently no-ops if it's blocked,
// rather than crashing the app either way.
function loadSavedBuild() {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}
function saveBuild(data) {
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch {
    // storage unavailable/blocked - nothing more to do
  }
}

const CHARACTERS_KEY = "talentTreeCharacters:v1";

// Saved characters are a completely separate storage layer from the
// live/scratch build above - loading one copies its data INTO the live
// state, but nothing ever writes back to a saved character except an
// explicit Save action. Playing around in the tree, or opening a shared
// build link, never touches these.
function loadCharacters() {
  try {
    const raw = window.localStorage.getItem(CHARACTERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function saveCharacters(list) {
  try {
    window.localStorage.setItem(CHARACTERS_KEY, JSON.stringify(list));
  } catch {
    // storage unavailable/blocked
  }
}

export default function TalentTree() {
  const saved = useMemo(() => loadSavedBuild(), []);
  const [classIdx, setClassIdx] = useState(saved?.classIdx ?? 0);
  // Each class keeps its own independent scratch build - switching tabs
  // shows that class's own progress, not a single build shared across all
  // five. Old saved data only had one flat "allocated" object (from before
  // this was per-class) - migrate it onto whichever class was active when
  // it was saved, rather than silently discarding it.
  const [allocatedByClass, setAllocatedByClass] = useState(() => {
    if (saved?.allocatedByClass) return saved.allocatedByClass;
    if (saved?.allocated) return { [saved.classIdx ?? 0]: saved.allocated };
    return {};
  });
  const allocated = allocatedByClass[classIdx] || EMPTY_ALLOCATED;
  // Drop-in replacement for the old single-build setAllocated - same call
  // shapes work (plain object or updater function), just scoped to
  // whichever class is currently active.
  const setAllocated = useCallback(
    (updater) => {
      setAllocatedByClass((prev) => {
        const current = prev[classIdx] || {};
        const next = typeof updater === "function" ? updater(current) : updater;
        return { ...prev, [classIdx]: next };
      });
    },
    [classIdx]
  );
  const [starLevels, setStarLevels] = useState(saved?.starLevels ?? {});

  // Undo/redo history - tracks the combined (allocatedByClass, starLevels)
  // state as a single "build" timeline. A ref-guarded effect watches both
  // pieces of state and pushes the *previous* snapshot onto the past stack
  // whenever they change, except when the change was itself caused by an
  // undo/redo call (guarded via isUndoRedoRef so we don't record history
  // while replaying history).
  const [historyPast, setHistoryPast] = useState([]);
  const [historyFuture, setHistoryFuture] = useState([]);
  const isUndoRedoRef = useRef(false);
  const prevBuildRef = useRef({ allocatedByClass, starLevels });
  const isFirstMountRef = useRef(true);
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      prevBuildRef.current = { allocatedByClass, starLevels };
      return;
    }
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false;
      prevBuildRef.current = { allocatedByClass, starLevels };
      return;
    }
    setHistoryPast((p) => [...p, prevBuildRef.current]);
    setHistoryFuture([]);
    prevBuildRef.current = { allocatedByClass, starLevels };
  }, [allocatedByClass, starLevels]);
  const undoBuild = useCallback(() => {
    setHistoryPast((p) => {
      if (p.length === 0) return p;
      const prev = p[p.length - 1];
      isUndoRedoRef.current = true;
      setHistoryFuture((f) => [{ allocatedByClass, starLevels }, ...f]);
      setAllocatedByClass(prev.allocatedByClass);
      setStarLevels(prev.starLevels);
      return p.slice(0, -1);
    });
  }, [allocatedByClass, starLevels]);
  const redoBuild = useCallback(() => {
    setHistoryFuture((f) => {
      if (f.length === 0) return f;
      const next = f[0];
      isUndoRedoRef.current = true;
      setHistoryPast((p) => [...p, { allocatedByClass, starLevels }]);
      setAllocatedByClass(next.allocatedByClass);
      setStarLevels(next.starLevels);
      return f.slice(1);
    });
  }, [allocatedByClass, starLevels]);
  const [selectedStarId, setSelectedStarId] = useState(null);
  const [bonusPoints, setBonusPoints] = useState(saved?.bonusPoints ?? 0);
  const [characters, setCharacters] = useState(() => loadCharacters());
  // Which saved character (if any) is currently loaded into the live
  // state - null means "just playing around", not tied to any character.
  const [activeCharacterId, setActiveCharacterId] = useState(null);
  const [newCharacterName, setNewCharacterName] = useState("");
  const [showNewCharacterInput, setShowNewCharacterInput] = useState(false);
  const [showCharacterPanel, setShowCharacterPanel] = useState(false);
  const [showPresetPanel, setShowPresetPanel] = useState(false);
  const [showClassMenu, setShowClassMenu] = useState(false);
  const [highlightedSaveId, setHighlightedSaveId] = useState(null);
  const [charDropdownOpen, setCharDropdownOpen] = useState(false);
  const [showCharPopover, setShowCharPopover] = useState(false);
  const [charPopoverPos, setCharPopoverPos] = useState(null);
  const charButtonRef = useRef(null);
  // window.confirm() can be silently blocked in sandboxed iframe previews
  // (confirmed: it doesn't even fire there) - custom confirmation instead,
  // guaranteed to work everywhere since it's just app UI, not a native
  // browser dialog.
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [view, setView] = useState({ x: 12, y: 0 });
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const svgRef = useRef(null);
  const desktopPopupRef = useRef(null);
  const toolbarRef = useRef(null);
  const clusterRef = useRef(null);
  const characterPanelRef = useRef(null);
  const presetPanelRef = useRef(null);
  const [showSummary, setShowSummary] = useState(true);
  const [activeGuideId, setActiveGuideId] = useState(null);
  // The guide step badges/tooltips on the tree are only useful as a live
  // preview of "what to do next" - once the build actually changes (either
  // because the guide was applied, or because the player just started
  // allocating points manually), the badges no longer reflect anything
  // actionable, so clear them. Guarded against the initial mount the same
  // way the undo/redo history effect is, so it doesn't fire before any
  // real change has happened.
  const isFirstGuideMountRef = useRef(true);
  useEffect(() => {
    if (isFirstGuideMountRef.current) {
      isFirstGuideMountRef.current = false;
      return;
    }
    setActiveGuideId(null);
  }, [allocated]);
  const [pendingSharedBuild, setPendingSharedBuild] = useState(null);
  const [shareCopied, setShareCopied] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  // When set, every node granting this stat type gets a red highlight ring
  // on the map (the "Show all" button in the detail panel).
  const [highlightType, setHighlightType] = useState(null);
  const [showNebulaDetail, setShowNebulaDetail] = useState(false);
  // Which guide-step badge's tooltip is currently showing - hover on
  // desktop, tap-to-toggle on mobile (no hover there).
  const [activeGuideTooltip, setActiveGuideTooltip] = useState(null);

  // Mobile layout kicks in below this width - the fixed-width side panel
  // and multi-row button bar were both designed desktop-first and become
  // genuinely unusable on a phone otherwise (panel alone eats ~75% of a
  // typical phone's screen width, squeezing the actual tree into a sliver).
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 700 : false
  );
  // Desktop-only layout toggle: "classic" is the redesigned bottom-panel
  // layout (matches the original game's framing); "modern" restores the
  // earlier right-sidebar + top-bar layout. Mobile is unaffected by this -
  // it always uses its own bottom-sheet layout regardless of this setting.
  // Defaults to "modern" for first-time visitors, but remembers whichever
  // mode was last used after that.
  const [uiMode, setUiMode] = useState(() => {
    try {
      const saved = window.localStorage.getItem("nebula_ui_mode");
      return saved === "classic" || saved === "modern" ? saved : "modern";
    } catch {
      return "modern";
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem("nebula_ui_mode", uiMode);
    } catch {
      // storage unavailable/blocked - just skip persisting
    }
  }, [uiMode]);
  // Only meaningful in "modern" mode (and mobile, which never lost it) -
  // classic mode always shows the static white ring instead, matching the
  // original game, with no toggle.
  const [pulseEnabled, setPulseEnabled] = useState(true);
  useEffect(() => {
    const goldHref = `${import.meta.env.BASE_URL}favicon-gold.png`;
    const grayHref = `${import.meta.env.BASE_URL}favicon-gray.png`;
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    const applyIcon = () => {
      link.href = document.hidden ? grayHref : goldHref;
    };
    applyIcon();
    document.addEventListener("visibilitychange", applyIcon);
    return () => document.removeEventListener("visibilitychange", applyIcon);
  }, []);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  useEffect(() => {
    if (isMobile || uiMode !== "classic" || (selectedId == null && selectedStarId == null)) return;
    const onPointerDown = (e) => {
      const inPopup = desktopPopupRef.current && desktopPopupRef.current.contains(e.target);
      const inToolbar = toolbarRef.current && toolbarRef.current.contains(e.target);
      const inCluster = clusterRef.current && clusterRef.current.contains(e.target);
      const inCharacterPanel = characterPanelRef.current && characterPanelRef.current.contains(e.target);
      const inPresetPanel = presetPanelRef.current && presetPanelRef.current.contains(e.target);
      if (!inPopup && !inToolbar && !inCluster && !inCharacterPanel && !inPresetPanel) {
        setSelectedId(null);
        setSelectedStarId(null);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isMobile, uiMode, selectedId, selectedStarId]);
  // Separate from isMobile (screen width) - this is specifically about
  // whether the device fires touch events at all. Matters for the guide
  // badge tooltip: after a real tap, browsers synthesize a compatibility
  // mouseleave shortly after (since no cursor is left hovering), which
  // would otherwise immediately undo a tap-triggered tooltip if hover
  // handlers were also attached.
  const hasTouch = typeof window !== "undefined" && "ontouchstart" in window;
  // On mobile, the panel is an overlay shown only when there's something to
  // show, instead of a permanent column - this tracks whether it's open.
  // Opened directly from the node/star click handlers (not via a
  // selectedId-watching effect) - watching for value changes misses the
  // case where you close the panel then click the SAME already-selected
  // node again, since selectedId doesn't actually change in that case.
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);

  // On mount, check if the URL carries a shared build (in the hash, so it
  // never gets sent to any server) and stage it for confirmation rather
  // than applying it immediately - don't want to silently blow away
  // whatever the visitor already had going.
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/#b=(.+)/);
    if (match) {
      const decoded = decodeBuild(decodeURIComponent(match[1]));
      if (decoded) setPendingSharedBuild(decoded);
    }
  }, []);

  // Autosave the build whenever it changes, so returning later (even days
  // later) picks up right where it was left off instead of opening fresh.
  useEffect(() => {
    saveBuild({ classIdx, allocatedByClass, starLevels, bonusPoints });
  }, [classIdx, allocatedByClass, starLevels, bonusPoints]);

  const spent = useMemo(
    () => Object.values(allocated).reduce((a, b) => a + b, 0),
    [allocated]
  );
  const activeCharacter = useMemo(
    () => characters.find((c) => c.id === activeCharacterId) || null,
    [characters, activeCharacterId]
  );
  const charPoints = useCallback(
    (c) => Object.values(c.allocated || {}).reduce((a, b) => a + b, 0),
    []
  );
  const hasUnsavedChanges = useMemo(() => {
    if (!activeCharacter) return false;
    return (
      activeCharacter.classIdx !== classIdx ||
      JSON.stringify(activeCharacter.allocated) !== JSON.stringify(allocated) ||
      JSON.stringify(activeCharacter.starLevels) !== JSON.stringify(starLevels)
    );
  }, [activeCharacter, classIdx, allocated, starLevels]);
  // Each nebula star level grants 1 skill point - confirmed mechanic
  // (all 7 stars at level 1 = 7 points). bonusPoints is an optional
  // manual top-up on top of that, defaulting to 0.
  const starPointTotal = useMemo(
    () => Object.values(starLevels).reduce((a, b) => a + b, 0),
    [starLevels]
  );
  const pointPool = starPointTotal + bonusPoints;
  const remaining = pointPool - spent;

  const selected = selectedId != null ? nodeById(selectedId) : null;
  const selectedRank = selected ? allocated[selected.id] || 0 : 0;

  // Solved once per allocation change, not once per inline JSX call -
  // solvePlans walks every node's prerequisite graph, so calling it 4x per
  // render (as separate inline checks previously did) is wasteful.
  const plan = useMemo(() => solvePlans(allocated), [allocated]);
  const selectedMaxCost = selected ? plan.costForRank(selected.id, selected.maxRank) : 0;
  const selectedNextCost = selected ? plan.costForRank(selected.id, (allocated[selected.id] || 0) + 1) : 0;

  const canAllocate = useCallback(
    (n) => {
      const cur = allocated[n.id] || 0;
      if (cur >= n.maxRank) return false;
      // No hard point-lock - you can overspend; the total display turns
      // red instead. Only reachability (a finite cost path exists) and max
      // rank actually gate this - allocating auto-paths through
      // prerequisites the same way Max does, just for a single point.
      return Number.isFinite(plan.costForRank(n.id, cur + 1));
    },
    [allocated, plan]
  );

  const canDeallocate = useCallback(
    (n) => {
      const cur = allocated[n.id] || 0;
      if (cur <= 0) return false;
      // Simulate the -1 and check real reachability (see computeValidSet) -
      // a plain "still satisfied" recheck can miss cases where a break
      // only surfaces inside a self-referencing cluster of nodes.
      const working = { ...allocated, [n.id]: cur - 1 };
      const valid = computeValidSet(working);
      const wouldOrphanSomething = NODES.some(
        (other) => other.id !== n.id && (working[other.id] || 0) > 0 && !valid.has(other.id)
      );
      return !wouldOrphanSomething;
    },
    [allocated]
  );

  // Allocating a single point now auto-paths through prerequisites too,
  // same as Max - just targeting current rank + 1 instead of max rank.
  function allocate(n) {
    const cur = allocated[n.id] || 0;
    if (cur >= n.maxRank) return;
    const cost = plan.costForRank(n.id, cur + 1);
    if (!Number.isFinite(cost)) return;
    setAllocated(applyPathToRank(n, allocated, cur + 1));
  }
  function deallocate(n) {
    if (!canDeallocate(n)) return;
    setAllocated((prev) => {
      const next = { ...prev, [n.id]: (prev[n.id] || 0) - 1 };
      if (next[n.id] <= 0) delete next[n.id];
      return next;
    });
  }
  function resetAll() {
    setAllocated({});
    setSelectedId(null);
  }

  function resetStarsOnly() {
    setStarLevels({});
    setSelectedStarId(null);
  }

  // Shared by the desktop node/star detail popups.
  const popupDescBox = (content, isNone) => (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        position: "relative",
        height: 82,
        borderRadius: 4,
        background: "rgba(15, 13, 11, 0.58)",
        overflow: "hidden",
      }}
    >
      <div
        className="popup-desc-scroll"
        style={{
          height: "100%",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "6px 16px 4px 8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 5, minWidth: 0 }}>
          {assetHref("nebula-attr-deco") && (
            <img src={assetHref("nebula-attr-deco")} alt="" width={11} height={12} style={{ flexShrink: 0, marginTop: 1 }} />
          )}
          <div style={{ fontSize: 11, color: isNone ? MUTED : BRIGHT, lineHeight: 1.4, minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" }}>
            {content || (isNone ? "None" : "No data available.")}
          </div>
        </div>
        <div style={{ height: 16, flexShrink: 0 }} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 2,
          right: 2,
          bottom: 2,
          width: 9,
          borderRadius: 4,
          backgroundImage: assetHref("nebula-skill-desc-bg3") ? `url(${assetHref("nebula-skill-desc-bg3")})` : undefined,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "2px 0",
        }}
      >
        <div style={{ width: 0, height: 0, borderLeft: "3px solid transparent", borderRight: "3px solid transparent", borderBottom: "4px solid #8a7f6e" }} />
        <div style={{ width: 0, height: 0, borderLeft: "3px solid transparent", borderRight: "3px solid transparent", borderTop: "4px solid #8a7f6e" }} />
      </div>
    </div>
  );

  const popupValuePill = (text, extraStyle) => (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 56,
        height: 18,
        backgroundImage: assetHref("nebula-value-bg") ? `url(${assetHref("nebula-value-bg")})` : undefined,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        padding: "0 8px",
        ...extraStyle,
      }}
    >
      <span style={{ fontSize: 9, color: BRIGHT, whiteSpace: "nowrap" }}>{text}</span>
    </div>
  );

  // Name badge: the hexagon end-caps come from nebula-name-bg.png at their
  // true (undistorted) proportions; the flat shaft between them is plain CSS
  // borders, since that segment of the source art is just a straight line
  // and scales perfectly without needing image slicing.
  const nameBadge = (text, color) => {
    const badgeHeight = 26;
    const vScale = badgeHeight / 38; // native asset height is 38
    const capWidth = Math.round(16 * vScale);
    const nameBg = assetHref("nebula-name-bg");
    const cap = (mirror) => (
      <div style={{ position: "relative", width: capWidth, height: badgeHeight, overflow: "hidden", flexShrink: 0, transform: mirror ? "scaleX(-1)" : undefined }}>
        {nameBg && (
          <img
            src={nameBg}
            alt=""
            style={{ position: "absolute", top: 0, left: 0, width: 71 * vScale, height: badgeHeight, maxWidth: "none" }}
          />
        )}
      </div>
    );
    return (
      <div style={{ display: "flex", alignItems: "stretch", height: badgeHeight }}>
        {cap(false)}
        <div
          style={{
            flex: "0 1 auto",
            minWidth: 20,
            maxWidth: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTop: "1.5px solid #a19788",
            borderBottom: "1.5px solid #a19788",
            padding: "0 5px",
          }}
        >
          <span style={{ fontSize: 9, color, textAlign: "center", lineHeight: 1.2, wordBreak: "break-word" }}>{text}</span>
        </div>
        {cap(true)}
      </div>
    );
  };

  // Small icon-only pill (value-bg background) used for the undo/redo/reset
  // toolbar above the popup's top-right corner.
  const popupIconPill = (iconKey, onClick, { mirror = false, disabled = false, title = "" } = {}) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{
        position: "relative",
        width: 30,
        height: 26,
        border: "none",
        padding: 0,
        backgroundImage: assetHref("nebula-value-bg") ? `url(${assetHref("nebula-value-bg")})` : undefined,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {assetHref(iconKey) && (
        <img
          src={assetHref(iconKey)}
          alt=""
          width={14}
          height={14}
          style={{ transform: mirror ? "scaleX(-1)" : undefined }}
        />
      )}
    </button>
  );

  // Same idea as popupIconPill, but all icons share ONE value-bg background
  // instead of each getting their own pill: | undo  redo  reset |
  const popupIconGroup = (items) => (
    <div
      style={{
        position: "relative",
        height: 30,
        minWidth: 34 + (items.length - 1) * 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        padding: "0 9px",
        backgroundImage: assetHref("nebula-value-bg") ? `url(${assetHref("nebula-value-bg")})` : undefined,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {items.map(({ iconKey, onClick, mirror, disabled, title, redBorder }, i) => (
        <button
          key={i}
          onClick={onClick}
          disabled={disabled}
          title={title}
          style={{
            border: "none",
            background: "transparent",
            padding: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.4 : 1,
          }}
        >
          {assetHref(iconKey) && (
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                border: redBorder ? "1px solid #e0473d" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={assetHref(iconKey)} alt="" width={16} height={16} style={{ transform: mirror ? "scaleX(-1)" : undefined }} />
            </div>
          )}
        </button>
      ))}
    </div>
  );

  function shareBuild() {
    const encoded = encodeBuild(classIdx, allocated, starLevels);
    const url = `${window.location.origin}${window.location.pathname}#b=${encodeURIComponent(encoded)}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(
        () => {
          setShareCopied(true);
          setTimeout(() => setShareCopied(false), 2000);
        },
        () => window.prompt("Copy this link:", url)
      );
    } else {
      window.prompt("Copy this link:", url);
    }
  }

  function loadSharedBuild() {
    if (!pendingSharedBuild) return;
    setClassIdx(pendingSharedBuild.classIdx);
    // Not using the setAllocated shim here - it closes over the CURRENT
    // classIdx, but we're also changing classIdx in this same action, so it
    // could write into the wrong class's slot. Target the new class
    // explicitly instead.
    setAllocatedByClass((prev) => ({ ...prev, [pendingSharedBuild.classIdx]: pendingSharedBuild.allocated }));
    setStarLevels(pendingSharedBuild.starLevels);
    setSelectedId(null);
    setSelectedStarId(null);
    setPendingSharedBuild(null);
    setActiveCharacterId(null); // never silently attach a shared build to one of your characters
    window.history.replaceState(null, "", window.location.pathname);
  }

  function dismissSharedBuild() {
    setPendingSharedBuild(null);
    window.history.replaceState(null, "", window.location.pathname);
  }

  function loadCharacter(id) {
    const c = characters.find((c) => c.id === id);
    if (!c) return;
    // Loading a character is a fresh starting point, not a point-allocation
    // change - skip recording it in history (same guard undo/redo itself
    // uses) and wipe both stacks so Undo can't reach back past a load.
    isUndoRedoRef.current = true;
    setClassIdx(c.classIdx);
    // Same reasoning as loadSharedBuild - target the character's own class
    // explicitly rather than via the setAllocated shim.
    setAllocatedByClass((prev) => ({ ...prev, [c.classIdx]: c.allocated }));
    setStarLevels(c.starLevels);
    setHistoryPast([]);
    setHistoryFuture([]);
    setSelectedId(null);
    setSelectedStarId(null);
    setActiveCharacterId(id);
    setConfirmDeleteId(null);
  }

  function saveActiveCharacter() {
    if (!activeCharacterId) return;
    setCharacters((prev) => {
      const next = prev.map((c) =>
        c.id === activeCharacterId ? { ...c, classIdx, allocated, starLevels, savedAt: Date.now() } : c
      );
      saveCharacters(next);
      return next;
    });
  }

  function saveAsNewCharacter(name) {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newChar = {
      id: `char_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      name: trimmed,
      classIdx,
      allocated,
      starLevels,
      savedAt: Date.now(),
    };
    setCharacters((prev) => {
      const next = [...prev, newChar];
      saveCharacters(next);
      return next;
    });
    setActiveCharacterId(newChar.id);
    setNewCharacterName("");
    setShowNewCharacterInput(false);
  }

  function deleteCharacter(id) {
    setCharacters((prev) => {
      const next = prev.filter((c) => c.id !== id);
      saveCharacters(next);
      return next;
    });
    if (activeCharacterId === id) setActiveCharacterId(null);
  }

  // Applies a preset guide step by step, each step resolved through the
  // same cheapest-path solver as the Max button - so you only need to list
  // the nodes that actually matter in PRESET_BUILDS, not every prereq.
  // Works for any target rank, not just each node's max.
  function applyGuide(guide) {
    // Fully replace the current build with the preset - a mixed result of
    // "some of my old points plus whatever this preset needs" would be
    // confusing and likely invalid, so start from a clean slate.
    let next = {};
    for (const step of guide.steps) {
      const stepPlan = solvePlans(next).needForRank(step.nodeId, step.rank);
      if (!stepPlan) continue; // unreachable - skip rather than crash
      for (const [id, rank] of Object.entries(stepPlan)) {
        next[id] = Math.max(next[id] || 0, rank);
      }
    }
    setAllocated(next);
  }

  function maxOut(n) {
    const cost = plan.costForRank(n.id, n.maxRank);
    if (cost <= 0) return;
    // No hard point-lock here either - same reasoning as canAllocate.
    setAllocated(applyPathToRank(n, allocated, n.maxRank));
  }

  function minOut(n) {
    if ((allocated[n.id] || 0) <= 0) return;
    setAllocated(cascadeRemove(n.id, allocated));
  }

  function nodeState(n) {
    const cur = allocated[n.id] || 0;
    if (cur >= n.maxRank) return "maxed";
    if (cur > 0) return "active";
    if (unlockCondition(n, allocated)) return "available";
    return "locked";
  }

  const stateColor = {
    maxed: GOLD,
    active: BRONZE,
    available: MUTED,
    locked: LOCKED,
  };

  // Desktop gets 1x/2x/3x/4x, mobile gets 1x/2x/3x. Starts at 2x either
  // way - 1x is there so people can pull back and see the whole pathway
  // at once, not as the default view.
  const ZOOM_LEVELS = isMobile ? [1, 2, 3] : [1, 2, 3];
  const [zoomIdx, setZoomIdx] = useState(ZOOM_LEVELS.indexOf(1));
  const scale = ZOOM_LEVELS[zoomIdx] ?? 1;

  function cycleZoom() {
    const nextIdx = (zoomIdx + 1) % ZOOM_LEVELS.length;
    const newScale = ZOOM_LEVELS[nextIdx];
    // Keep whatever content point is currently at the center of the
    // viewport staying at the center after the zoom level changes, instead
    // of anchoring on the top-left corner. viewBox is fixed at 28 55 1030 1162,
    // so its center in viewBox-space is always (543, 636).
    const contentX = (543 - view.x) / scale;
    const contentY = (636 - view.y) / scale;
    setView({ x: 543 - newScale * contentX, y: 636 - newScale * contentY });
    setZoomIdx(nextIdx);
  }

  function onPointerDown(e) {
    // px-per-svg-unit ratio, needed to convert screen-pixel drag distance
    // into SVG-unit translation now that viewBox is fixed and panning is
    // done via the <g> transform instead of mutating viewBox.
    const rect = svgRef.current?.getBoundingClientRect();
    const pxPerUnit = rect ? rect.width / 1080 : 1;
    // Explicit pointer capture - makes drag tracking robust against the
    // content visually shifting under the cursor as we pan (which can
    // confuse a browser's implicit capture on some devices/trackpads).
    e.target.setPointerCapture?.(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, view, pxPerUnit };
  }
  function onPointerMove(e) {
    if (!dragRef.current) return;
    const rawDx = e.clientX - dragRef.current.startX;
    const rawDy = e.clientY - dragRef.current.startY;
    // ignore tiny movement so a plain click never registers as a pan
    if (!dragRef.current.engaged) {
      if (Math.abs(rawDx) < 4 && Math.abs(rawDy) < 4) return;
      dragRef.current.engaged = true;
    }
    // Translate happens *before* scale in "translate(...) scale(...)", so
    // this delta is in the same outer unit space regardless of zoom level -
    // no division by scale needed (that was specific to the old
    // viewBox-mutation approach).
    const dx = rawDx / dragRef.current.pxPerUnit;
    const dy = rawDy / dragRef.current.pxPerUnit;
    setView({ x: dragRef.current.view.x + dx, y: dragRef.current.view.y + dy });
  }
  function onPointerUp() {
    // A drag that actually moved (engaged) still fires a native click
    // right after pointerup - if that click lands on a node, it would
    // select it even though the user was just panning. Suppress exactly
    // one click in that case. Auto-clear shortly after regardless of
    // whether a node's onClick actually consumes it - if the drag ended
    // over empty canvas (no node under the cursor), nothing would ever
    // reset the flag otherwise, incorrectly suppressing the next
    // unrelated click too.
    if (dragRef.current?.engaged) {
      suppressClickRef.current = true;
      setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
    dragRef.current = null;
  }

  // viewBox is now fixed ("0 0 1080 1240" on the <svg> itself) - pan/zoom
  // is applied via a <g transform> instead, see render below.

  // Zoom is now purely the magnifier button (see cycleZoom) - this listener
  // does NOT drive our zoom state. It exists only to swallow trackpad pinch
  // and ctrl+scroll so the browser's own native page/iframe zoom can't fire
  // underneath us; that native zoom (not our old continuous-zoom code) is
  // the likely real cause of the crash-after-zooming reports, since a
  // laptop trackpad pinch reaches the browser via the same wheel+ctrlKey
  // path regardless of whether our app listens for it. Must be a native,
  // explicitly non-passive listener - React's synthetic onWheel can get
  // treated as passive in some hosting contexts, silently no-op-ing
  // preventDefault().
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const handler = (e) => e.preventDefault();
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  const unusedAltNodeIds = useMemo(() => {
    const set = new Set();
    if (spent > pointPool) return set; // overspent - no spare points to act on an alt route, so don't hint at one
    NODES.forEach((n) => {
      (n.act || []).forEach((packed) => {
        const targetId = Math.round(packed / 1000);
        const targetReq = packed % 1000;
        const target = nodeById(targetId);
        if (!target) return;
        const cur = allocated[n.id] || 0;
        const lit = cur > 0;
        const thisAltSatisfied = (allocated[target.id] || 0) >= targetReq;
        const isActivePath = lit && thisAltSatisfied;
        const isMaxedUnusedAlt = lit && !isActivePath && cur >= n.maxRank;
        if (isMaxedUnusedAlt) set.add(n.id);
      });
    });
    return set;
  }, [allocated, spent, pointPool]);

  const lines = useMemo(() => {
    const out = [];
    const activeLinkHref = assetHref("n-link-active");
    const inactiveLinkHref = assetHref("n-link-inactive");
    NODES.forEach((n) => {
      (n.act || []).forEach((packed) => {
        const targetId = Math.round(packed / 1000);
        const targetReq = packed % 1000;
        const target = nodeById(targetId);
        if (!target) return;
        const cur = allocated[n.id] || 0;
        const lit = cur > 0;
        // n having points doesn't mean THIS specific alternative is the one
        // that satisfied it - only color it gold if this target actually
        // meets the rank this edge requires. Otherwise it's just another
        // option that happens to render alongside the real one.
        const thisAltSatisfied = (allocated[target.id] || 0) >= targetReq;
        const isActivePath = lit && thisAltSatisfied;
        const isMaxedUnusedAlt = lit && !isActivePath && cur >= n.maxRank;
        const showPulse = uiMode === "modern" && pulseEnabled && isMaxedUnusedAlt;

        if (activeLinkHref && inactiveLinkHref) {
          // Same technique as the original site: stretch and rotate a thin
          // texture to form the connector, instead of a plain drawn line.
          const dx = n.x - target.x;
          const dy = n.y - target.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
          const thickness = isActivePath ? 9 : lit ? 3 : 2.5;
          out.push(
            <image
              key={`${target.id}-${n.id}`}
              className={showPulse ? "pulse-red-link" : undefined}
              href={isActivePath ? activeLinkHref : inactiveLinkHref}
              x={target.x}
              y={target.y - thickness / 2}
              width={dist}
              height={thickness}
              preserveAspectRatio="none"
              transform={`rotate(${angleDeg} ${target.x} ${target.y})`}
              opacity={showPulse ? undefined : isActivePath ? 1 : lit ? 0.6 : 0.4}
              style={{ pointerEvents: "none" }}
            />
          );
        } else {
          out.push(
            <line
              key={`${target.id}-${n.id}`}
              x1={target.x}
              y1={target.y}
              x2={n.x}
              y2={n.y}
              stroke={isActivePath ? GOLD : lit ? "#e8e2d8" : "#332a22"}
              strokeWidth={isActivePath ? 2.5 : lit ? 1.5 : 1.5}
              opacity={isActivePath ? 0.9 : lit ? 0.35 : 0.5}
            />
          );
        }
      });
    });
    return out;
  }, [allocated, uiMode, pulseEnabled]);

  return (
    <div
      className="app-root"
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        background: CANVAS_BG,
        color: BRIGHT,
        width: "100%",
        touchAction: "none",
        overscrollBehavior: "none",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        .talent-title { font-family: 'Cinzel', serif; letter-spacing: 0.04em; }
        .popup-desc-scroll::-webkit-scrollbar { display: none; }
        .popup-desc-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .row1-scroll::-webkit-scrollbar { display: none; }
        .row1-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .class-tab { transition: all .15s ease; }
        .node-circle { transition: r .15s ease, filter .15s ease; cursor: pointer; }
        .node-circle:hover { filter: brightness(1.3); }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-thumb { background: #4a443d; border-radius: 4px; }
        .app-root { height: 100vh; height: 100dvh; }
        @keyframes pulse-red-link {
          0%, 100% { opacity: 0.3; filter: sepia(1) saturate(14) hue-rotate(-43deg) brightness(0.85); }
          50% { opacity: 1; filter: sepia(1) saturate(20) hue-rotate(-43deg) brightness(1.3); }
        }
        .pulse-red-link { animation: pulse-red-link 2.8s ease-in-out infinite; }
        @keyframes pulse-preview-opacity {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .pulse-preview { animation: pulse-preview-opacity 2.8s ease-in-out infinite; }
      `}</style>

      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 8,
            right: 8,
            zIndex: 600,
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "#15100cdd",
            border: "1px solid #33291f",
            borderRadius: 8,
            padding: "4px 8px",
            fontFamily: "monospace",
            fontSize: 12,
            color: spent > pointPool ? "#e05a4e" : BRIGHT,
          }}
          title={`${starPointTotal} pts from nebula star levels + ${bonusPoints} bonus. No hard cap - overspending just turns this red.`}
        >
          {assetHref("nebula-skill-point") && (
            <img src={assetHref("nebula-skill-point")} alt="" width={13} height={13} />
          )}
          {spent} / {pointPool}
        </div>
      )}

      {!isMobile && (
        <div
          style={{
            position: "fixed",
            top: 10,
            right: 10,
            zIndex: 600,
            display: "flex",
            gap: 4,
          }}
        >
          {uiMode === "modern" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#15100cdd",
                border: "1px solid #33291f",
                borderRadius: 8,
                padding: "3px 10px",
              }}
            >
              <span className="talent-title" style={{ fontSize: 14, color: GOLD, whiteSpace: "nowrap" }}>
                Talent Tree
              </span>
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: 13,
                  color: spent > pointPool ? "#e05a4e" : BRIGHT,
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  whiteSpace: "nowrap",
                }}
                title={`${starPointTotal} pts from nebula star levels + ${bonusPoints} bonus. No hard cap - overspending just turns this red.`}
              >
                {assetHref("nebula-skill-point") && (
                  <img src={assetHref("nebula-skill-point")} alt="" width={14} height={14} />
                )}
                {spent} / {pointPool}
              </div>
            </div>
          )}

          {uiMode === "modern" && PRESETS_ENABLED && (() => {
            const guidesForClass = PRESET_BUILDS.filter((g) => g.classIdx === classIdx);
            if (guidesForClass.length === 0) return null;
            const activeGuide = guidesForClass.find((g) => g.id === activeGuideId);
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "#15100cdd",
                  border: "1px solid #33291f",
                  borderRadius: 8,
                  padding: 2,
                  gap: 2,
                }}
              >
                <button
                  onClick={() => setActiveGuideId(guidesForClass[0].id)}
                  title="Select the starter build for this class"
                  style={{
                    padding: "5px 8px",
                    borderRadius: 6,
                    border: "none",
                    background: "transparent",
                    color: MUTED,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  Click here for starter build
                </button>
                <select
                  value={activeGuideId || ""}
                  onChange={(e) => setActiveGuideId(e.target.value || null)}
                  title="This fills the fastest way to the selected nodes"
                  style={{
                    background: "#15100c",
                    border: "1px solid #33291f",
                    borderRadius: 6,
                    color: activeGuide ? BRIGHT : MUTED,
                    fontSize: 12,
                    padding: "5px 6px",
                    maxWidth: 100,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <option value="">Preset</option>
                  {guidesForClass.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name.includes(" - ") ? g.name.split(" - ").slice(1).join(" - ") : g.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    if (!activeGuide) return;
                    applyGuide(activeGuide);
                    setActiveGuideId(null);
                  }}
                  disabled={!activeGuide}
                  title="Allocate every step of this preset in order"
                  style={{
                    padding: "5px 10px",
                    borderRadius: 6,
                    border: `1px solid ${activeGuide ? GOLD : "#3a322b"}`,
                    background: activeGuide ? GOLD + "22" : "transparent",
                    color: activeGuide ? BRIGHT : "#4a443d",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: activeGuide ? "pointer" : "not-allowed",
                  }}
                >
                  Use
                </button>
              </div>
            );
          })()}

          <div
            style={{
              display: "flex",
              background: "#15100cdd",
              border: "1px solid #33291f",
              borderRadius: 8,
              padding: 3,
              gap: 3,
            }}
          >
            <button
              onClick={() => setUiMode("classic")}
              style={{
                padding: "5px 12px",
                borderRadius: 6,
                border: "none",
                background: uiMode === "classic" ? BRONZE : "transparent",
                color: uiMode === "classic" ? "#1a1512" : MUTED,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Classic
            </button>
            <button
              onClick={() => setUiMode("modern")}
              style={{
                padding: "5px 12px",
                borderRadius: 6,
                border: "none",
                background: uiMode === "modern" ? BRONZE : "transparent",
                color: uiMode === "modern" ? "#1a1512" : MUTED,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Modern
            </button>
          </div>
        </div>
      )}

      {pendingSharedBuild && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "10px 16px",
            background: "#2a2113",
            borderBottom: `1px solid ${GOLD}`,
            fontSize: 13,
          }}
        >
          <span style={{ color: BRIGHT }}>
            This link has a shared build ({CLASSES[pendingSharedBuild.classIdx]?.name}). Load it? This will
            replace your current build.
          </span>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button
              onClick={loadSharedBuild}
              style={{
                padding: "5px 12px",
                borderRadius: 6,
                border: `1px solid ${GOLD}`,
                background: GOLD + "22",
                color: BRIGHT,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Load it
            </button>
            <button
              onClick={dismissSharedBuild}
              style={{
                padding: "5px 12px",
                borderRadius: 6,
                border: "1px solid #3a322b",
                background: "transparent",
                color: MUTED,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {(isMobile || uiMode === "modern") && (
      <>
      <div style={{ position: "relative", borderBottom: `1px solid #33291f`, background: PANEL_BG }}>
        <div
          className="row1-scroll"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "10px 10px 10px 10px",
            marginRight: !isMobile ? 280 : 110,
            flexWrap: "nowrap",
            overflowX: "auto",
            gap: 4,
          }}
        >
        <div
          style={{
            display: "flex",
            gap: 4,
            flexWrap: "nowrap",
          }}
        >
          {CLASSES.map((c, i) => {
            const iconKey = c.name.toLowerCase();
            const active = classIdx === i;
            const iconSrc = assetHref(active ? iconKey : `${iconKey}_0`);
            return (
              <button
                key={c.id}
                className="class-tab"
                onClick={() => setClassIdx(i)}
                style={{
                  padding: "5px 13px 5px 8px",
                  borderRadius: 6,
                  border: `1px solid ${active ? c.accent : "#3a322b"}`,
                  background: active ? c.accent + "22" : "transparent",
                  color: active ? BRIGHT : MUTED,
                  fontWeight: 600,
                  fontSize: 12,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  flexShrink: 0,
                }}
              >
                {iconSrc && <img src={iconSrc} alt="" width={17} height={17} style={{ borderRadius: 4 }} />}
                {c.name}
              </button>
            );
          })}
        </div>

        {(() => {
          const sortedCharacters = [...characters].sort(
            (a, b) => a.classIdx - b.classIdx || a.name.localeCompare(b.name)
          );
          const charIcon = (c) => assetHref(CLASSES[c.classIdx].name.toLowerCase());
          return (
            <div style={{ position: "relative", flexShrink: 0 }}>
              <button
                ref={charButtonRef}
                onClick={() => {
                  if (!showCharPopover && charButtonRef.current) {
                    const rect = charButtonRef.current.getBoundingClientRect();
                    const popoverWidth = 260; // matches the popover's minWidth + margin
                    const overflowsRight = rect.left + popoverWidth > window.innerWidth - 8;
                    setCharPopoverPos(
                      overflowsRight
                        ? { top: rect.bottom + 4, right: window.innerWidth - rect.right }
                        : { top: rect.bottom + 4, left: rect.left }
                    );
                  }
                  setShowCharPopover((s) => !s);
                }}
                style={{
                  background: "#15100c",
                  border: "1px solid #33291f",
                  borderRadius: 6,
                  color: activeCharacter ? BRIGHT : MUTED,
                  fontSize: 12,
                  padding: "5px 8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  whiteSpace: "nowrap",
                }}
              >
                <SaveIcon />
                {activeCharacter ? activeCharacter.name : "Saved"}
                {hasUnsavedChanges && <span style={{ color: "#e0a05a" }}>&#9679;</span>}
                <span style={{ fontSize: 9, color: MUTED }}>▾</span>
              </button>

              {showCharPopover && charPopoverPos && createPortal(
                <>
                  <div
                    onClick={() => {
                      setShowCharPopover(false);
                      setCharDropdownOpen(false);
                      setConfirmDeleteId(null);
                      setShowNewCharacterInput(false);
                    }}
                    style={{ position: "fixed", inset: 0, zIndex: 400 }}
                  />
                  <div
                    style={{
                      position: "fixed",
                      top: charPopoverPos.top,
                      left: charPopoverPos.left,
                      right: charPopoverPos.right,
                      minWidth: 240,
                      maxWidth: "calc(100vw - 16px)",
                      maxHeight: 320,
                      overflowY: "auto",
                      background: "#15100c",
                      border: "1px solid #33291f",
                      borderRadius: 8,
                      zIndex: 401,
                      boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
                      padding: 8,
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    <div
                      onClick={() => {
                        setActiveCharacterId(null);
                        setConfirmDeleteId(null);
                      }}
                      style={{
                        padding: "6px 8px",
                        fontSize: 12,
                        borderRadius: 5,
                        color: !activeCharacter ? BRIGHT : MUTED,
                        cursor: "pointer",
                        background: !activeCharacter ? GOLD + "18" : "transparent",
                      }}
                    >
                      Start new
                    </div>
                    {sortedCharacters.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          loadCharacter(c.id);
                          setConfirmDeleteId(null);
                        }}
                        style={{
                          padding: "6px 8px",
                          fontSize: 12,
                          borderRadius: 5,
                          color: activeCharacterId === c.id ? BRIGHT : "#c9c2b6",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          background: activeCharacterId === c.id ? GOLD + "18" : "transparent",
                        }}
                      >
                        {charIcon(c) && (
                          <img src={charIcon(c)} alt="" width={16} height={16} style={{ borderRadius: 3 }} />
                        )}
                        {c.name} ({charPoints(c)})
                      </div>
                    ))}

                    <div style={{ borderTop: "1px solid #33291f", margin: "2px 0" }} />

                    {activeCharacter && !confirmDeleteId && (
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <button
                          onClick={saveActiveCharacter}
                          disabled={!hasUnsavedChanges}
                          style={{
                            flex: 1,
                            padding: "6px 10px",
                            borderRadius: 6,
                            border: `1px solid ${hasUnsavedChanges ? GOLD : "#3a322b"}`,
                            background: hasUnsavedChanges ? GOLD + "22" : "transparent",
                            color: hasUnsavedChanges ? BRIGHT : "#4a443d",
                            fontSize: 12,
                            cursor: hasUnsavedChanges ? "pointer" : "not-allowed",
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(activeCharacter.id)}
                          style={{
                            padding: "6px 10px",
                            borderRadius: 6,
                            border: "1px solid #5a2a24",
                            background: "transparent",
                            color: "#e0847a",
                            fontSize: 12,
                            cursor: "pointer",
                          }}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    )}

                    {activeCharacter && confirmDeleteId === activeCharacter.id && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <span style={{ fontSize: 12, color: "#e0847a" }}>Delete "{activeCharacter.name}"?</span>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button
                            onClick={() => {
                              deleteCharacter(confirmDeleteId);
                              setConfirmDeleteId(null);
                            }}
                            style={{
                              flex: 1,
                              padding: "6px 10px",
                              borderRadius: 6,
                              border: "1px solid #e0473d",
                              background: "#e0473d22",
                              color: "#ff8478",
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                          >
                            Yes, delete
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            style={{
                              padding: "6px 10px",
                              borderRadius: 6,
                              border: "1px solid #3a322b",
                              background: "transparent",
                              color: MUTED,
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {showNewCharacterInput ? (
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        <input
                          autoFocus
                          value={newCharacterName}
                          onChange={(e) => setNewCharacterName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveAsNewCharacter(newCharacterName);
                            if (e.key === "Escape") {
                              setShowNewCharacterInput(false);
                              setNewCharacterName("");
                            }
                          }}
                          placeholder="Character name"
                          style={{
                            background: "#0f0c09",
                            border: "1px solid #33291f",
                            borderRadius: 6,
                            color: BRIGHT,
                            fontSize: 12,
                            padding: "6px 8px",
                          }}
                        />
                        <div style={{ display: "flex", gap: 6 }}>
                          <button
                            onClick={() => saveAsNewCharacter(newCharacterName)}
                            style={{
                              flex: 1,
                              padding: "6px 10px",
                              borderRadius: 6,
                              border: `1px solid ${GOLD}`,
                              background: GOLD + "22",
                              color: BRIGHT,
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => {
                              setShowNewCharacterInput(false);
                              setNewCharacterName("");
                            }}
                            style={{
                              padding: "6px 10px",
                              borderRadius: 6,
                              border: "1px solid #3a322b",
                              background: "transparent",
                              color: MUTED,
                              fontSize: 12,
                              cursor: "pointer",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowNewCharacterInput(true)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: 6,
                          border: "1px solid #3a322b",
                          background: "transparent",
                          color: MUTED,
                          fontSize: 12,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                        }}
                      >
                        <SaveIcon />
                        Save as new
                      </button>
                    )}
                  </div>
                </>,
                document.body
              )}
            </div>
          );
        })()}

        <button
          onClick={shareBuild}
          style={{
            padding: "5px 8px",
            borderRadius: 6,
            border: `1px solid ${shareCopied ? "#5ec26a" : "#3a322b"}`,
            background: shareCopied ? "#5ec26a22" : "transparent",
            color: shareCopied ? "#8fe09a" : MUTED,
            fontSize: 12,
            cursor: "pointer",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
        >
          {shareCopied ? "Link copied!" : "Share Build"}
        </button>
      </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: 24,
            background: `linear-gradient(to right, ${PANEL_BG}, transparent)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: !isMobile ? 280 : 110,
            width: 24,
            background: `linear-gradient(to left, ${PANEL_BG}, transparent)`,
            pointerEvents: "none",
          }}
        />
      </div>
      </>
      )}

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div
          style={{
            position: "relative",
            flex: 1,
            marginBottom: !isMobile && uiMode === "classic" ? "calc(min(170px, 27vh) + 54px)" : undefined,
          }}
        >
          <svg
            ref={svgRef}
            viewBox="28 55 1030 1162"
            style={{ width: "100%", height: "100%", cursor: dragRef.current ? "grabbing" : "grab", touchAction: "none" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
          <g transform={`translate(${view.x} ${view.y}) scale(${scale})`}>
            <rect
              x={-200}
              y={-200}
              width={1480}
              height={1640}
              fill="transparent"
              onClick={() => {
                if (suppressClickRef.current) return;
                setSelectedId(null);
                setSelectedStarId(null);
              }}
            />
            {assetHref("nebula-bg") && (
              <image
                href={assetHref("nebula-bg")}
                x={-200}
                y={-200}
                width={1480}
                height={1640}
                preserveAspectRatio="xMidYMid slice"
                opacity={0.6}
                style={{ pointerEvents: "none" }}
              />
            )}
            <g>{lines}</g>
            <g>
            {NODES.map((n) => {
              const state = nodeState(n);
              const r = nodeRadius(n);
              const cur = allocated[n.id] || 0;
              const isSel = selectedId === n.id;
              const active = cur > 0;
              const iconId = isKeystone(n) ? n.icon[classIdx] : n.icon[0];
              const border = borderHref(n.q, active);
              const icon = iconHref(iconId, active);
              const highlight = assetHref("node-select-highlight");
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x},${n.y})`}
                  onClick={() => {
                    if (suppressClickRef.current) {
                      suppressClickRef.current = false;
                      return;
                    }
                    setSelectedId(n.id);
                    setSelectedStarId(null);
                    if (isMobile) setMobilePanelOpen(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {border ? (
                    <image
                      className="node-circle"
                      href={border}
                      x={-r + (n.q === 1 || n.q === 3 ? -1 : 0)}
                      y={-r + (n.q === 2 || n.q === 3 ? -1 : 0)}
                      width={r * 2}
                      height={r * 2}
                      opacity={state === "locked" ? 0.55 : 1}
                    />
                  ) : (
                    <circle
                      className="node-circle"
                      r={r}
                      fill={state === "locked" ? "#221b16" : stateColor[state]}
                      fillOpacity={state === "locked" ? 0.5 : isKeystone(n) ? 0.9 : 0.85}
                      stroke={isSel ? "#fff" : stateColor[state]}
                      strokeWidth={isSel ? 2.5 : isKeystone(n) ? 2 : 1.2}
                    />
                  )}
                  {n.q === 1 && (
                    // The q1 border art is the smallest source asset (30x30)
                    // rendered at the smallest on-screen size (18px) - a
                    // brightness boost couldn't fix it because the real
                    // problem is the ring detail becoming sub-pixel thin
                    // after scaling, not just dim. Drawing a crisp vector
                    // ring here is guaranteed visible regardless of source
                    // asset fidelity.
                    <circle
                      r={r - 0.75}
                      fill="none"
                      stroke={active ? GOLD : "#9a9488"}
                      strokeWidth={1.3}
                      opacity={state === "locked" ? 0.6 : active ? 0.95 : 0.8}
                      style={{ pointerEvents: "none" }}
                    />
                  )}
                  {icon && (
                    <image
                      href={icon}
                      x={-r * 0.78}
                      y={-r * 0.78}
                      width={r * 1.56}
                      height={r * 1.56}
                      opacity={state === "locked" ? 0.55 : 1}
                      style={{ pointerEvents: "none" }}
                    />
                  )}
                  {uiMode === "classic" && unusedAltNodeIds.has(n.id) && (
                    <circle r={r + 2} fill="none" stroke="#fff" strokeWidth={1.5} opacity={0.85} style={{ pointerEvents: "none" }} />
                  )}
                  {isSel && highlight && (
                    // Measured: the bright ring inside this asset sits at
                    // 67% of its own half-width. At the old 1.3r size that
                    // put it at ~0.87r - almost exactly on top of the
                    // keystone rank dots (0.855r). Sized up to 1.8r so it
                    // lands at ~1.2r instead, clearly outside both the dots
                    // and the node's own border edge.
                    <image
                      href={highlight}
                      x={-r * 1.8}
                      y={-r * 1.8}
                      width={r * 3.6}
                      height={r * 3.6}
                      style={{ pointerEvents: "none" }}
                    />
                  )}
                  {isSel && !highlight && (
                    <circle r={r + 3} fill="none" stroke="#fff" strokeWidth={2} style={{ pointerEvents: "none" }} />
                  )}
                  {highlightType != null && nodeGrantsType(n, highlightType) && highlight && (
                    <image
                      href={highlight}
                      x={-r * 1.8}
                      y={-r * 1.8}
                      width={r * 3.6}
                      height={r * 3.6}
                      style={{ pointerEvents: "none", filter: "hue-rotate(140deg) saturate(1.4)" }}
                    />
                  )}
                  {highlightType != null && nodeGrantsType(n, highlightType) && !highlight && (
                    <circle r={r + 3} fill="none" stroke="#e0473d" strokeWidth={2} style={{ pointerEvents: "none" }} />
                  )}
                  {isKeystone(n) &&
                    Array.from({ length: 6 }).map((_, i) => {
                      // The border art has 6 physical holes (measured via
                      // circle detection, confirmed visually) - rank 1 is
                      // represented by the border itself switching from
                      // inactive to active (see `active` above), not by a
                      // dot. Ranks 2-7 then light one dot each, so 1 + 6 = 7
                      // total distinguishable states, matching maxRank.
                      const angle = ((-90 + i * (360 / 6)) * Math.PI) / 180;
                      // Measured directly from the actual n-q3-active source
                      // art via circle detection: the decorative ring sits
                      // at ~85% of the node radius, not outside it.
                      const dotR = r * 0.855;
                      const dx = dotR * Math.cos(angle);
                      const dy = dotR * Math.sin(angle);
                      const lit = i < cur - 1;
                      return (
                        <circle
                          key={i}
                          cx={dx}
                          cy={dy}
                          r={2.2}
                          fill={lit ? GOLD : "#4a443d"}
                          stroke={lit ? "#fff8" : "none"}
                          strokeWidth={lit ? 0.6 : 0}
                          style={{ pointerEvents: "none" }}
                        />
                      );
                    })}
                  {isKeystone(n) && cur > 0 && (
                    <text
                      textAnchor="middle"
                      x={r * 0.7}
                      y={-r * 0.7}
                      dy="4"
                      fontSize="10"
                      fontWeight="700"
                      fill="#1a1512"
                      stroke="#fff8"
                      strokeWidth="2"
                      paintOrder="stroke"
                      style={{ pointerEvents: "none" }}
                    >
                      {cur}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* Active guide step badges */}
          {(() => {
            if (!PRESETS_ENABLED) return null;
            const guide = PRESET_BUILDS.find((g) => g.id === activeGuideId && g.classIdx === classIdx);
            if (!guide) return null;
            return guide.steps.map((step, i) => {
              const n = nodeById(step.nodeId);
              if (!n) return null;
              const tooltipOpen = activeGuideTooltip === i;
              return (
                <g key={i} transform={`translate(${n.x},${n.y})`}>
                  <g
                    style={{ cursor: step.label ? "pointer" : "default" }}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (step.label) setActiveGuideTooltip(tooltipOpen ? null : i);
                    }}
                    onMouseEnter={hasTouch ? undefined : () => step.label && setActiveGuideTooltip(i)}
                    onMouseLeave={
                      hasTouch ? undefined : () => setActiveGuideTooltip((cur) => (cur === i ? null : cur))
                    }
                  >
                    <circle cx={16} cy={-16} r={11} fill={GOLD} stroke="#1a1512" strokeWidth={1.5} />
                    <text x={16} y={-16} dy="4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1a1512">
                      {step.badge ?? i + 1}
                    </text>
                  </g>
                  {tooltipOpen && step.label && (() => {
                    // Fixed-size box clipped longer labels. Estimate line
                    // count from character length instead, so short labels
                    // stay compact and long ones actually get room to show.
                    const tooltipWidth = 220;
                    const charsPerLine = 32;
                    const estLines = Math.max(1, Math.ceil(step.label.length / charsPerLine));
                    const tooltipHeight = estLines * 15 + 18;
                    return (
                      <foreignObject
                        x={16 - tooltipWidth / 2}
                        y={-16 - 11 - 6 - tooltipHeight}
                        width={tooltipWidth}
                        height={tooltipHeight}
                        style={{ pointerEvents: "none" }}
                      >
                        <div
                          style={{
                            background: "#15100cf2",
                            border: `1px solid ${GOLD}`,
                            borderRadius: 6,
                            padding: "5px 8px",
                            fontSize: 11,
                            color: BRIGHT,
                            fontFamily: "'Inter', system-ui, sans-serif",
                            textAlign: "center",
                            lineHeight: 1.3,
                          }}
                        >
                          {step.label}
                        </div>
                      </foreignObject>
                    );
                  })()}
                </g>
              );
            });
          })()}

          {/* Nebula star ring - 7 nodes, real positions/ids/icons from source */}
          <g>
            {assetHref("nebula-center-seven-bg") ? (
              <image
                href={assetHref("nebula-center-seven-bg")}
                x={STAR_CENTER.x - STAR_RADIUS - 20}
                y={STAR_CENTER.y - STAR_RADIUS - 20}
                width={(STAR_RADIUS + 20) * 2}
                height={(STAR_RADIUS + 20) * 2}
                style={{ pointerEvents: "none" }}
              />
            ) : (
              <circle
                cx={STAR_CENTER.x}
                cy={STAR_CENTER.y}
                r={STAR_RADIUS + 14}
                fill="none"
                stroke="#3a5a7a"
                strokeWidth={1}
                strokeDasharray="3 4"
                opacity={0.5}
              />
            )}
            {assetHref("n8") && (
              <>
                <image
                  href={assetHref("n8")}
                  x={STAR_CENTER.x - 2 - 29}
                  y={STAR_CENTER.y + 2 - 29}
                  width={58}
                  height={58}
                  style={{ pointerEvents: "none" }}
                />
                <circle
                  cx={STAR_CENTER.x - 2}
                  cy={STAR_CENTER.y + 2}
                  r={29}
                  fill="none"
                  stroke="#6fa8dc"
                  strokeWidth={2}
                  style={{ pointerEvents: "none" }}
                />
                <text
                  x={STAR_CENTER.x - 2}
                  y={STAR_CENTER.y + 2 + 29 + 12}
                  textAnchor="middle"
                  fontSize={9}
                  fill="#e0847a"
                  onClick={resetStarsOnly}
                  style={{ cursor: "pointer" }}
                >
                  Reset star nodes
                </text>
              </>
            )}
            {STAR_IDS.map((id, idx) => {
              const c = idx + 1;
              const pos = starPosition(c);
              const level = starLevels[id] || 0;
              const isSel = selectedStarId === id;
              const starIcon = assetHref(`n${c}`);
              return (
                <g
                  key={id}
                  transform={`translate(${pos.x},${pos.y})`}
                  onClick={() => {
                    if (suppressClickRef.current) {
                      suppressClickRef.current = false;
                      return;
                    }
                    setSelectedStarId(id);
                    setSelectedId(null);
                    if (isMobile) setMobilePanelOpen(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {starIcon ? (
                    <>
                      <circle
                        r={15}
                        fill={level > 0 ? "#2a4a6a" : "#1a2530"}
                        stroke={isSel ? "#fff" : level > 0 ? "#6fa8dc" : "#3a5a7a"}
                        strokeWidth={isSel ? 2.5 : 2}
                      />
                      <image
                        href={starIcon}
                        x={-12}
                        y={-12}
                        width={24}
                        height={24}
                        opacity={level > 0 ? 1 : 0.6}
                        style={{ pointerEvents: "none" }}
                      />
                    </>
                  ) : (
                    <>
                      <circle
                        r={14}
                        fill={level > 0 ? "#2a4a6a" : "#1a2530"}
                        stroke={isSel ? "#fff" : level > 0 ? "#6fa8dc" : "#3a5a7a"}
                        strokeWidth={isSel ? 2.5 : 2}
                      />
                      <text
                        textAnchor="middle"
                        dy="4"
                        fontSize="9"
                        fontWeight="700"
                        fill="#cfe3f5"
                        style={{ pointerEvents: "none" }}
                      >
                        {c}
                      </text>
                    </>
                  )}
                </g>
              );
            })}
          </g>
          </g>
        </svg>

        {(isMobile || uiMode === "modern") && (
          <>
          <button
            onClick={() => {
              if (isMobile) setMobilePanelOpen(false);
              setShowNebulaDetail(true);
            }}
            title="Nebula state details"
            style={{
              position: "absolute",
              bottom: "calc(164px + env(safe-area-inset-bottom, 0px))",
              right: 16,
              zIndex: 501,
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid #3a322b",
              background: "#221b16",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            {assetHref("nebula-state-detail-btn") && (
              <img
                src={assetHref("nebula-state-detail-btn")}
                alt=""
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
              />
            )}
          </button>

          <button
            onClick={() => setPulseEnabled((p) => !p)}
            title={pulseEnabled ? "Hide pulsing highlight" : "Show pulsing highlight"}
            style={{
              position: "absolute",
              bottom: "calc(116px + env(safe-area-inset-bottom, 0px))",
              right: 16,
              zIndex: 501,
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `1px solid ${pulseEnabled ? BRONZE : "#3a322b"}`,
              background: pulseEnabled ? BRONZE + "22" : "#221b16",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className={pulseEnabled ? "pulse-preview" : undefined}
              style={{
                width: 20,
                height: 4,
                borderRadius: 2,
                background: pulseEnabled ? "#e0473d" : "#5a5248",
                opacity: pulseEnabled ? undefined : 0.6,
              }}
            />
          </button>

          <button
            onClick={cycleZoom}
            title="Cycle zoom level"
            style={{
              position: "absolute",
              bottom: "calc(68px + env(safe-area-inset-bottom, 0px))",
              right: 16,
              zIndex: 501,
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `1px solid ${scale === 1 ? "#3a322b" : BRONZE}`,
              background: scale === 1 ? "#221b16" : BRONZE + "22",
              color: scale === 1 ? MUTED : BRONZE,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ZoomIcon size={18} />
          </button>

          <div
            style={{
              position: "absolute",
              bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
              right: 16,
              zIndex: 501,
            }}
          >
            {popupIconGroup([
              { iconKey: "undo-btn", onClick: undoBuild, disabled: historyPast.length === 0, title: "Undo last action" },
              { iconKey: "undo-btn", onClick: redoBuild, mirror: true, disabled: historyFuture.length === 0, title: "Redo" },
              { iconKey: "reset-btn", onClick: resetAll, title: "Reset all skill nodes", redBorder: true },
            ])}
          </div>
          </>
        )}
          <button
            onClick={() => setShowCredits(true)}
            title="Credits"
            style={{
              position: "fixed",
              bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
              left: 16,
              zIndex: 501,
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid #3a322b",
              background: "#221b16",
              color: MUTED,
              fontSize: 15,
              fontStyle: "italic",
              fontFamily: "Georgia, serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            i
          </button>
          {(isMobile ? scale !== 1 : uiMode === "modern") && (
            <div
              style={{
                position: "absolute",
                bottom: "calc(72px + env(safe-area-inset-bottom, 0px))",
                right: 62,
                fontSize: 11,
                color: BRONZE,
                background: "#15100cdd",
                padding: "3px 8px",
                borderRadius: 4,
              }}
            >
              {scale}x
            </div>
          )}
        </div>

        {((isMobile && mobilePanelOpen) || (!isMobile && uiMode === "modern")) && (
          <div
            style={
              isMobile
                ? {
                    position: "fixed",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: "35dvh",
                    maxHeight: "35dvh",
                    background: PANEL_BG,
                    borderTop: `1px solid ${BRONZE}`,
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                    padding: 16,
                    paddingTop: 10,
                    overflowY: "auto",
                    zIndex: 500,
                    boxShadow: "0 -4px 20px rgba(0,0,0,0.5)",
                  }
                : {
                    width: 260,
                    borderLeft: "1px solid #33291f",
                    background: PANEL_BG,
                    padding: 16,
                    overflowY: "auto",
                  }
            }
          >
            {isMobile && (
              <>
                <div
                  style={{
                    width: 36,
                    height: 4,
                    borderRadius: 2,
                    background: "#3a322b",
                    margin: "0 auto 10px",
                  }}
                />
                <button
                  onClick={() => setMobilePanelOpen(false)}
                  style={{
                    position: "fixed",
                    bottom: "calc(35dvh + 8px)",
                    right: 12,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "1px solid #3a322b",
                    background: "#221b16",
                    color: BRIGHT,
                    fontSize: 14,
                    cursor: "pointer",
                    zIndex: 501,
                  }}
                >
                  &times;
                </button>
              </>
            )}
          {selectedStarId != null && !isMobile && uiMode === "classic" && (
            <div style={{ color: MUTED, fontSize: 13, textAlign: "center", padding: "20px 0" }}>
              Details shown in the panel below.
            </div>
          )}
          {selectedStarId != null && (isMobile || uiMode === "modern") && (
            <div style={{ marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid #33291f" }}>
              <div className="talent-title" style={{ fontSize: 16, color: "#8ec3f0", marginBottom: 4 }}>
                {STAR_NAMES[STAR_IDS.indexOf(selectedStarId)]}
              </div>
              <div style={{ fontSize: 11, color: MUTED, marginBottom: 12 }}>
                Nebula Star &middot; Level {starLevelLabel(starLevels[selectedStarId] || 0)}
              </div>
              {(() => {
                const c = STAR_IDS.indexOf(selectedStarId) + 1;
                const starIcon = assetHref(`n${c}`);
                const bgAsset = assetHref("detail-panel-bg");
                if (!starIcon && !bgAsset) return null;
                const size = 64;
                const bgW = 90;
                const bgH = 90 * (169 / 152);
                return (
                  <div style={{ position: "relative", width: bgW, height: bgH, margin: "0 auto 12px" }}>
                    {bgAsset && (
                      <img
                        src={bgAsset}
                        alt=""
                        width={bgW}
                        height={bgH}
                        style={{ position: "absolute", top: -8, left: 0 }}
                      />
                    )}
                    {starIcon && (
                      <img
                        src={starIcon}
                        alt=""
                        width={size * 0.6}
                        height={size * 0.6}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    )}
                  </div>
                );
              })()}
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <button
                  onClick={() =>
                    setStarLevels((prev) => ({
                      ...prev,
                      [selectedStarId]: Math.max(0, (prev[selectedStarId] || 0) - 1),
                    }))
                  }
                  disabled={(starLevels[selectedStarId] || 0) <= 0}
                  style={{
                    flex: 1, padding: "7px 0", borderRadius: 6, border: "1px solid #3a322b",
                    background: "transparent",
                    color: (starLevels[selectedStarId] || 0) > 0 ? BRIGHT : "#4a443d",
                    fontSize: 12,
                    cursor: (starLevels[selectedStarId] || 0) > 0 ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                >
                  {assetHref("decrease-btn") && (
                    <img src={assetHref("decrease-btn")} alt="" width={14} height={14} style={{ opacity: (starLevels[selectedStarId] || 0) > 0 ? 1 : 0.4 }} />
                  )}
                  Remove
                </button>
                <button
                  onClick={() =>
                    setStarLevels((prev) => ({
                      ...prev,
                      [selectedStarId]: Math.min(49, (prev[selectedStarId] || 0) + 1),
                    }))
                  }
                  disabled={(starLevels[selectedStarId] || 0) >= 49}
                  style={{
                    flex: 1, padding: "7px 0", borderRadius: 6, border: `1px solid ${"#8ec3f0"}`,
                    background: (starLevels[selectedStarId] || 0) < 49 ? "#8ec3f022" : "transparent",
                    color: (starLevels[selectedStarId] || 0) < 49 ? "#cfe3f5" : "#4a443d",
                    fontWeight: 600,
                    fontSize: 12,
                    cursor: (starLevels[selectedStarId] || 0) < 49 ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                >
                  {assetHref("increase-btn") && (
                    <img src={assetHref("increase-btn")} alt="" width={14} height={14} style={{ opacity: (starLevels[selectedStarId] || 0) < 49 ? 1 : 0.4 }} />
                  )}
                  Add
                </button>
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <button
                  onClick={() => setStarLevels((prev) => ({ ...prev, [selectedStarId]: 0 }))}
                  disabled={(starLevels[selectedStarId] || 0) <= 0}
                  style={{
                    flex: 1, padding: "7px 0", borderRadius: 6, border: "1px solid #3a322b",
                    background: "transparent",
                    color: (starLevels[selectedStarId] || 0) > 0 ? "#e0847a" : "#4a443d",
                    fontSize: 12,
                    cursor: (starLevels[selectedStarId] || 0) > 0 ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                >
                  {assetHref("min-btn") && (
                    <img src={assetHref("min-btn")} alt="" width={14} height={14} style={{ opacity: (starLevels[selectedStarId] || 0) > 0 ? 1 : 0.4 }} />
                  )}
                  Min
                </button>
                <button
                  onClick={() => setStarLevels((prev) => ({ ...prev, [selectedStarId]: 49 }))}
                  disabled={(starLevels[selectedStarId] || 0) >= 49}
                  style={{
                    flex: 1, padding: "7px 0", borderRadius: 6, border: `1px solid ${BRONZE}`,
                    background: "transparent",
                    color: (starLevels[selectedStarId] || 0) < 49 ? BRONZE : "#4a443d",
                    fontSize: 12,
                    cursor: (starLevels[selectedStarId] || 0) < 49 ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                >
                  {assetHref("max-btn") && (
                    <img src={assetHref("max-btn")} alt="" width={14} height={14} style={{ opacity: (starLevels[selectedStarId] || 0) < 49 ? 1 : 0.4 }} />
                  )}
                  Max
                </button>
              </div>
              <select
                value={starLevels[selectedStarId] || 0}
                onChange={(e) =>
                  setStarLevels((prev) => ({ ...prev, [selectedStarId]: Number(e.target.value) }))
                }
                style={{
                  width: "100%",
                  background: "#15100c",
                  border: "1px solid #33291f",
                  borderRadius: 6,
                  color: BRIGHT,
                  fontSize: 12,
                  padding: "6px 8px",
                }}
              >
                <optgroup label="Tier 0">
                  <option value={0}>0</option>
                </optgroup>
                {Array.from({ length: 7 }).map((_, tier) => (
                  <optgroup key={tier} label={`Tier ${tier + 1}`}>
                    {Array.from({ length: 7 }).map((_, sub) => {
                      const level = tier * 7 + sub + 1;
                      return (
                        <option key={level} value={level}>
                          {tier + 1}-{sub + 1}
                        </option>
                      );
                    })}
                  </optgroup>
                ))}
              </select>
            </div>
          )}
          {selectedStarId == null && !selected && (
            <div style={{ color: MUTED, fontSize: 13, textAlign: "center", padding: "20px 0" }}>
              Select a node to view its details.
            </div>
          )}
          {selectedStarId == null && selected && !isMobile && uiMode === "classic" && (
            <div style={{ color: MUTED, fontSize: 13, textAlign: "center", padding: "20px 0" }}>
              Details shown in the panel below.
            </div>
          )}
          {selectedStarId == null && selected && (isMobile || uiMode === "modern") && (
            <div>
              <div
                className="talent-title"
                style={{ fontSize: 16, color: GOLD, marginBottom: 4 }}
              >
                {selected.ranks[Math.max(selectedRank, 1) - 1]?.name?.[classIdx] ||
                  "Unknown Skill"}
              </div>
              <div style={{ fontSize: 11, color: MUTED, marginBottom: 12 }}>
                Node #{selected.id} &middot; Quality {selected.q} &middot; Rank{" "}
                {selectedRank}/{selected.maxRank}
              </div>
              {(() => {
                const iconId = isKeystone(selected) ? selected.icon[classIdx] : selected.icon[0];
                const active = selectedRank > 0;
                const border = borderHref(selected.q, active);
                const icon = iconHref(iconId, active);
                const bgAsset = assetHref("detail-panel-bg");
                if (!border && !icon && !bgAsset) return null;
                const size = 64;
                const bgW = 90;
                const bgH = 90 * (169 / 152);
                return (
                  <div style={{ position: "relative", width: bgW, height: bgH, margin: "0 auto 12px" }}>
                    {bgAsset && (
                      <img
                        src={bgAsset}
                        alt=""
                        width={bgW}
                        height={bgH}
                        style={{ position: "absolute", top: -8, left: 0 }}
                      />
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: size,
                        height: size,
                      }}
                    >
                      {border && (
                        <img
                          src={border}
                          alt=""
                          width={size}
                          height={size}
                          style={{
                            position: "absolute",
                            top: selected.q === 2 || selected.q === 3 ? -1 : 0,
                            left: selected.q === 1 || selected.q === 3 ? -1 : 0,
                          }}
                        />
                      )}
                      {selected.q === 1 && (
                        <div
                          style={{
                            position: "absolute",
                            top: 1.5,
                            left: 1.5,
                            width: size - 3,
                            height: size - 3,
                            borderRadius: "50%",
                            border: `1.5px solid ${active ? GOLD : "#9a9488"}`,
                            opacity: active ? 0.95 : 0.8,
                            pointerEvents: "none",
                          }}
                        />
                      )}
                      {icon && (
                        <img
                          src={icon}
                          alt=""
                          width={size * 0.78}
                          height={size * 0.78}
                          style={{ position: "absolute", top: size * 0.11, left: size * 0.11 }}
                        />
                      )}
                      {isKeystone(selected) &&
                        Array.from({ length: 6 }).map((_, i) => {
                          // Same mapping as the tree nodes: border activation
                          // covers rank 1, these 6 dots cover ranks 2-7.
                          const angle = ((-90 + i * (360 / 6)) * Math.PI) / 180;
                          const dotR = (size / 2) * 0.855;
                          const dx = dotR * Math.cos(angle);
                          const dy = dotR * Math.sin(angle);
                          const lit = i < selectedRank - 1;
                          return (
                            <div
                              key={i}
                              style={{
                                position: "absolute",
                                left: size / 2 + dx - 3,
                                top: size / 2 + dy - 3,
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: lit ? GOLD : "#4a443d",
                                boxShadow: lit ? "0 0 3px rgba(255,255,255,0.5)" : "none",
                              }}
                            />
                          );
                        })}
                    </div>
                  </div>
                );
              })()}
              {(selected.maxRank === 3 || selected.maxRank === 5) &&
                (() => {
                  const myType = selected.ranks?.[0]?.attr?.[0]?.type;
                  if (myType == null) return null;
                  const isShowing = highlightType === myType;
                  return (
                    <button
                      onClick={() => setHighlightType(isShowing ? null : myType)}
                      style={{
                        display: "block",
                        margin: "0 auto 14px",
                        padding: "5px 14px",
                        borderRadius: 6,
                        border: `1px solid ${isShowing ? "#e0473d" : "#3a322b"}`,
                        background: isShowing ? "#e0473d22" : "transparent",
                        color: isShowing ? "#ff8478" : MUTED,
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      {isShowing ? "Hide all" : "Show all"}
                    </button>
                  );
                })()}
              <div
                style={{
                  fontSize: 13,
                  color: BRIGHT,
                  lineHeight: 1.5,
                  marginBottom: 16,
                  minHeight: 100,
                  maxHeight: 140,
                  overflowY: "auto",
                }}
              >
                {(() => {
                  const rank = selected.ranks[Math.max(selectedRank, 1) - 1];
                  const stat = rank?.stat;
                  const desc = rank?.desc?.[classIdx];
                  if (!stat && !desc) return "No data available at this rank yet.";
                  return (
                    <>
                      {stat && (
                        <div style={{ color: BRONZE, fontFamily: "monospace", fontSize: 12, marginBottom: desc ? 8 : 0 }}>
                          {stat}
                        </div>
                      )}
                      {desc && <div>{desc}</div>}
                    </>
                  );
                })()}
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <button
                  onClick={() => deallocate(selected)}
                  disabled={!canDeallocate(selected)}
                  style={{
                    flex: 1,
                    padding: "7px 0",
                    borderRadius: 6,
                    border: "1px solid #3a322b",
                    background: "transparent",
                    color: canDeallocate(selected) ? BRIGHT : "#4a443d",
                    fontSize: 12,
                    cursor: canDeallocate(selected) ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  {assetHref("decrease-btn") && (
                    <img src={assetHref("decrease-btn")} alt="" width={14} height={14} style={{ opacity: canDeallocate(selected) ? 1 : 0.4 }} />
                  )}
                  Remove
                </button>
                <button
                  onClick={() => allocate(selected)}
                  disabled={!canAllocate(selected)}
                  title="Adds 1 point here, auto-pathing through any prerequisites needed"
                  style={{
                    flex: 1,
                    padding: "7px 0",
                    borderRadius: 6,
                    border: `1px solid ${GOLD}`,
                    background: canAllocate(selected) ? GOLD : "transparent",
                    color: canAllocate(selected) ? "#1a1512" : "#4a443d",
                    fontSize: 12,
                    cursor: canAllocate(selected) ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  {assetHref("increase-btn") && (
                    <img src={assetHref("increase-btn")} alt="" width={14} height={14} />
                  )}
                  Add
                </button>
              </div>
              {!canAllocate(selected) && (allocated[selected.id] || 0) < selected.maxRank && (
                <div style={{ fontSize: 11, color: "#e0847a", marginTop: -10, marginBottom: 14 }}>
                  Unreachable - no valid path to this node exists yet.
                </div>
              )}
              {(allocated[selected.id] || 0) >= selected.maxRank && (
                <div style={{ fontSize: 11, color: GOLD, marginTop: -10, marginBottom: 14 }}>
                  Already at max rank.
                </div>
              )}

              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <button
                  onClick={() => minOut(selected)}
                  disabled={(allocated[selected.id] || 0) <= 0}
                  style={{
                    flex: 1,
                    padding: "7px 0",
                    borderRadius: 6,
                    border: "1px solid #3a322b",
                    background: "transparent",
                    color: (allocated[selected.id] || 0) > 0 ? "#e0847a" : "#4a443d",
                    fontSize: 12,
                    cursor: (allocated[selected.id] || 0) > 0 ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  {assetHref("min-btn") && (
                    <img src={assetHref("min-btn")} alt="" width={14} height={14} style={{ opacity: (allocated[selected.id] || 0) > 0 ? 1 : 0.4 }} />
                  )}
                  Min
                </button>
                <button
                  onClick={() => maxOut(selected)}
                  disabled={selectedMaxCost <= 0}
                  style={{
                    flex: 1,
                    padding: "7px 0",
                    borderRadius: 6,
                    border: `1px solid ${BRONZE}`,
                    background: "transparent",
                    color: selectedMaxCost > 0 ? BRONZE : "#4a443d",
                    fontSize: 12,
                    cursor: selectedMaxCost > 0 ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                  title="Fills this node and the cheapest valid path to it"
                >
                  {assetHref("max-btn") && (
                    <img src={assetHref("max-btn")} alt="" width={14} height={14} style={{ opacity: selectedMaxCost > 0 ? 1 : 0.4 }} />
                  )}
                  {selectedMaxCost <= 0
                    ? "Max"
                    : !Number.isFinite(selectedMaxCost)
                    ? "Max (unreachable)"
                    : `Max (${selectedMaxCost} pts)`}
                </button>
              </div>

              <div style={{ fontSize: 11, color: MUTED }}>
                {(selected.act || []).length > 0 ? (
                  <>
                    Requires:{" "}
                    {selected.act.map((packed) => {
                      const tid = Math.round(packed / 1000);
                      const req = packed % 1000;
                      return `#${tid} @ rank ${req}`;
                    }).join(" or ")}
                  </>
                ) : (
                  "Starting node - no prerequisites."
                )}
              </div>
            </div>
          )}

          {showSummary && (
            <div style={{ marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid #33291f" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                <span className="talent-title" style={{ fontSize: 13, color: BRONZE }}>
                  Build Summary
                </span>
                <span style={{ fontSize: 11, color: MUTED }}>{spent} pts spent</span>
              </div>

              {(() => {
                const totals = allStatTotals(allocated, classIdx);
                if (totals.length === 0) return null;
                return (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ flex: 1, height: 1, background: "#33291f" }} />
                      <span style={{ fontSize: 10, letterSpacing: "0.08em", color: MUTED, textTransform: "uppercase" }}>
                        Stats
                      </span>
                      <div style={{ flex: 1, height: 1, background: "#33291f" }} />
                    </div>
                    <div style={{ maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
                      {totals.map((t) => (
                        <div
                          key={t.type}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 12,
                            fontFamily: "monospace",
                            color: BRONZE,
                          }}
                        >
                          <span>{t.label}</span>
                          <span>
                            {t.value >= 0 ? "+" : ""}
                            {t.display}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {Object.keys(allocated).length === 0 ? (
                <div style={{ fontSize: 12, color: MUTED }}>No points allocated yet.</div>
              ) : (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ flex: 1, height: 1, background: "#33291f" }} />
                    <span style={{ fontSize: 10, letterSpacing: "0.08em", color: MUTED, textTransform: "uppercase" }}>
                      Skills
                    </span>
                    <div style={{ flex: 1, height: 1, background: "#33291f" }} />
                  </div>
                  <div style={{ maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
                    {Object.entries(allocated)
                      .filter(([, rank]) => rank > 0)
                      .map(([id, rank]) => [nodeById(Number(id)), rank])
                      .filter(([n]) => n && isKeystone(n)) // filler stat nodes already counted in Stats above
                      .sort((a, b) => skillSlot(a[0]) - skillSlot(b[0]))
                      .map(([n, rank]) => {
                        const rankData = n.ranks[Math.min(rank, n.ranks.length) - 1];
                        const label = rankData?.name?.[classIdx] || `Node #${n.id}`;
                        const effect = rankData?.stat || rankData?.desc?.[classIdx];
                        return (
                          <div
                            key={n.id}
                            onClick={() => {
                              setSelectedId(n.id);
                              setSelectedStarId(null);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <div
                              style={{
                                fontSize: 12,
                                color: rank >= n.maxRank ? GOLD : BRIGHT,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {label}
                            </div>
                            {effect && (
                              <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{effect}</div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        )}

        {!isMobile && uiMode === "classic" && (
          <div
            ref={toolbarRef}
            style={{
              position: "fixed",
              left: "50%",
              bottom: "calc(min(170px, 27vh) + 14px)",
              transform: "translateX(-50%)",
              width: "min(440px, 74vw)",
              zIndex: 501,
              display: "flex",
              justifyContent: "flex-end",
              gap: 5,
              pointerEvents: "none",
            }}
          >
            <div style={{ pointerEvents: "auto" }}>
              {popupIconGroup([
                { iconKey: "undo-btn", onClick: undoBuild, disabled: historyPast.length === 0, title: "Undo last action" },
                { iconKey: "undo-btn", onClick: redoBuild, mirror: true, disabled: historyFuture.length === 0, title: "Redo" },
                { iconKey: "reset-btn", onClick: resetAll, title: "Reset all skill nodes", redBorder: true },
              ])}
            </div>
          </div>
        )}

        {!isMobile && uiMode === "classic" && (
          <div
            ref={clusterRef}
            style={{
              position: "fixed",
              left: "50%",
              bottom: "calc(min(170px, 27vh) + 14px)",
              transform: "translateX(-50%)",
              width: "min(440px, 74vw)",
              zIndex: 501,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 8,
              pointerEvents: "none",
            }}
          >
            <button
              onClick={() => setShowNebulaDetail(true)}
              title="Nebula state details"
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "1px solid #3a322b",
                background: "#221b16",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
              }}
            >
              {assetHref("nebula-state-detail-btn") && (
                <img src={assetHref("nebula-state-detail-btn")} alt="" width={30} height={30} style={{ borderRadius: "50%" }} />
              )}
            </button>
            <button
              onClick={cycleZoom}
              title="Cycle zoom level"
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "1px solid #3a322b",
                background: "#221b16",
                color: MUTED,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
              }}
            >
              {scale}x
            </button>
            <div style={{ position: "relative", pointerEvents: "auto" }}>
              <button
                onClick={() => setShowClassMenu((s) => !s)}
                title="Change class"
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  border: `1px solid ${showClassMenu ? BRONZE : "#3a322b"}`,
                  background: "#221b16",
                  padding: 0,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {assetHref(CLASSES[classIdx].name.toLowerCase()) && (
                  <img
                    src={assetHref(CLASSES[classIdx].name.toLowerCase())}
                    alt=""
                    width={26}
                    height={26}
                    style={{ borderRadius: "50%" }}
                  />
                )}
              </button>
              {showClassMenu && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 6px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: 4,
                    background: "#15100cdd",
                    border: "1px solid #3a322b",
                    borderRadius: 20,
                    padding: 4,
                  }}
                >
                  {CLASSES.map((c, i) => i !== classIdx && (
                    <button
                      key={c.id}
                      onClick={() => {
                        setClassIdx(i);
                        setShowClassMenu(false);
                      }}
                      title={c.name}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        border: "1px solid #3a322b",
                        background: "#221b16",
                        padding: 0,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {assetHref(c.name.toLowerCase()) && (
                        <img src={assetHref(c.name.toLowerCase())} alt="" width={22} height={22} style={{ borderRadius: "50%" }} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setShowCharacterPanel((s) => !s);
                setShowPresetPanel(false);
              }}
              title={showCharacterPanel ? "Close saved characters" : "Saved characters"}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: `1px solid ${showCharacterPanel ? BRONZE : "#3a322b"}`,
                background: showCharacterPanel ? BRONZE + "22" : "#221b16",
                color: showCharacterPanel ? BRONZE : MUTED,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
              }}
            >
              <SaveIcon size={16} />
            </button>
            <button
              onClick={() => {
                setShowPresetPanel((s) => !s);
                setShowCharacterPanel(false);
              }}
              title={showPresetPanel ? "Close presets" : "Presets"}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: `1px solid ${showPresetPanel ? BRONZE : "#3a322b"}`,
                background: showPresetPanel ? BRONZE + "22" : "#221b16",
                color: showPresetPanel ? BRONZE : MUTED,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "auto",
              }}
            >
              <RouteIcon size={16} />
            </button>
          </div>
        )}

        {!isMobile && uiMode === "classic" && showCharacterPanel && !showPresetPanel && (() => {
          const classIconKey = CLASSES[classIdx].name.toLowerCase();
          const classIcon = assetHref(classIconKey);
          const thisClassSaves = characters.filter((c) => c.classIdx === classIdx).sort((a, b) => a.name.localeCompare(b.name));
          const otherClassSaves = characters
            .filter((c) => c.classIdx !== classIdx)
            .sort((a, b) => a.classIdx - b.classIdx || a.name.localeCompare(b.name));
          const highlighted = characters.find((c) => c.id === highlightedSaveId) || null;

          const charBox = (list, showClassIcon) => (
            <div style={{ flex: 1, minWidth: 0, position: "relative", height: 82, borderRadius: 4, background: "rgba(15, 13, 11, 0.58)", overflow: "hidden" }}>
              <div className="popup-desc-scroll" style={{ height: "100%", overflowY: "auto", overflowX: "hidden", padding: "6px 16px 4px 8px" }}>
                {list.length === 0 ? (
                  <div style={{ fontSize: 11, color: MUTED }}>No saved characters.</div>
                ) : (
                  list.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setHighlightedSaveId(c.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 11,
                        color: highlightedSaveId === c.id ? GOLD : BRIGHT,
                        padding: "3px 0",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {showClassIcon && assetHref(CLASSES[c.classIdx].name.toLowerCase()) && (
                        <img
                          src={assetHref(CLASSES[c.classIdx].name.toLowerCase())}
                          alt=""
                          width={11}
                          height={11}
                          style={{ borderRadius: 2, flexShrink: 0 }}
                        />
                      )}
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                        {c.name} ({charPoints(c)})
                      </span>
                    </div>
                  ))
                )}
                <div style={{ height: 16, flexShrink: 0 }} />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  bottom: 2,
                  width: 9,
                  borderRadius: 4,
                  backgroundImage: assetHref("nebula-skill-desc-bg3") ? `url(${assetHref("nebula-skill-desc-bg3")})` : undefined,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  pointerEvents: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "2px 0",
                }}
              >
                <div style={{ width: 0, height: 0, borderLeft: "3px solid transparent", borderRight: "3px solid transparent", borderBottom: "4px solid #8a7f6e" }} />
                <div style={{ width: 0, height: 0, borderLeft: "3px solid transparent", borderRight: "3px solid transparent", borderTop: "4px solid #8a7f6e" }} />
              </div>
            </div>
          );

          return (
            <div
              ref={characterPanelRef}
              style={{
                position: "fixed",
                left: "50%",
                bottom: 0,
                transform: "translateX(-50%)",
                width: "min(440px, 74vw)",
                height: "min(170px, 27vh)",
                overflow: "hidden",
                zIndex: 500,
                backgroundImage: assetHref("nebula-skill-panel-bg") ? `url(${assetHref("nebula-skill-panel-bg")})` : undefined,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                padding: 5,
                boxShadow: "0 -4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  gap: 10,
                  padding: "2px 8px 0px 8px",
                  minWidth: 0,
                  backgroundImage: assetHref("nebula-skill-panel-inner-bg") ? `url(${assetHref("nebula-skill-panel-inner-bg")})` : undefined,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Left column: class icon, save-as, currently loaded name */}
                <div style={{ width: 104, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {(() => {
                    const bgAsset = assetHref("detail-panel-bg");
                    const size = 40;
                    const bgW = 58;
                    const bgH = bgW * (169 / 152);
                    if (!classIcon && !bgAsset) return null;
                    return (
                      <div style={{ position: "relative", width: bgW, height: bgH, marginTop: 3, marginBottom: 3 }}>
                        {bgAsset && <img src={bgAsset} alt="" width={bgW} height={bgH} style={{ position: "absolute", top: -5, left: 0 }} />}
                        {classIcon && (
                          <img
                            src={classIcon}
                            alt=""
                            width={size * 0.78}
                            height={size * 0.78}
                            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                          />
                        )}
                      </div>
                    );
                  })()}
                  <div style={{ flex: 1 }} />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginBottom: 8 }}>
                    <div onClick={shareBuild} style={{ cursor: "pointer" }}>
                      {popupValuePill(shareCopied ? "Link copied!" : "Share Build")}
                    </div>
                    {showNewCharacterInput ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <input
                          autoFocus
                          value={newCharacterName}
                          onChange={(e) => setNewCharacterName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveAsNewCharacter(newCharacterName);
                            if (e.key === "Escape") {
                              setShowNewCharacterInput(false);
                              setNewCharacterName("");
                            }
                          }}
                          placeholder="Name..."
                          style={{
                            width: 62,
                            fontSize: 9,
                            padding: "3px 6px",
                            borderRadius: 4,
                            border: `1px solid ${BRONZE}`,
                            background: "#15100c",
                            color: BRIGHT,
                            textAlign: "center",
                          }}
                        />
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => saveAsNewCharacter(newCharacterName)}
                          title="Confirm"
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            border: "1px solid #4caf6a",
                            background: "#4caf6a22",
                            color: "#7bd996",
                            fontSize: 9,
                            lineHeight: "14px",
                            padding: 0,
                            cursor: "pointer",
                          }}
                        >
                          ✓
                        </button>
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setShowNewCharacterInput(false);
                            setNewCharacterName("");
                          }}
                          title="Cancel"
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            border: "1px solid #e0473d",
                            background: "#e0473d22",
                            color: "#ff8478",
                            fontSize: 9,
                            lineHeight: "14px",
                            padding: 0,
                            cursor: "pointer",
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div onClick={() => setShowNewCharacterInput(true)} style={{ cursor: "pointer" }}>
                        {popupValuePill("Save as...")}
                      </div>
                    )}
                    <div
                      onClick={() => {
                        setActiveCharacterId(null);
                        resetAll();
                      }}
                      title="Clear the current build and start fresh"
                      style={{ cursor: "pointer" }}
                    >
                      {popupValuePill("Start new")}
                    </div>
                  </div>
                </div>

                <div style={{ width: 1, alignSelf: "stretch", background: "#a19788", opacity: 0.35, flexShrink: 0 }} />

                {/* Right column: header, char lists, load/delete buttons */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>{popupValuePill("This class")}</div>
                    <div style={{ width: 18, flexShrink: 0 }} />
                    <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>{popupValuePill("Other classes")}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "stretch", gap: 0, position: "relative", minWidth: 0 }}>
                    {charBox(thisClassSaves)}
                    <div style={{ width: 18, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                      {assetHref("nebula-skill-desc-next-arrow") && <img src={assetHref("nebula-skill-desc-next-arrow")} alt="" width={14} height={15} />}
                    </div>
                    {charBox(otherClassSaves, true)}
                  </div>
                  <div style={{ flex: 1 }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", marginTop: -15, marginBottom: -6 }}>
                    <div />
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => {
                          if (!highlighted) return;
                          loadCharacter(highlighted.id);
                          setShowCharacterPanel(false);
                        }}
                        disabled={!highlighted}
                        title="Load"
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 8,
                          border: "none",
                          background: "transparent",
                          color: highlighted ? BRIGHT : "#4a443d",
                          cursor: highlighted ? "pointer" : "not-allowed",
                          fontSize: 11,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Load
                      </button>
                      <button
                        onClick={() => {
                          if (!highlighted) return;
                          if (confirmDeleteId === highlighted.id) {
                            deleteCharacter(highlighted.id);
                            setConfirmDeleteId(null);
                            setHighlightedSaveId(null);
                          } else {
                            setConfirmDeleteId(highlighted.id);
                          }
                        }}
                        disabled={!highlighted}
                        title="Delete"
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 8,
                          border: "none",
                          background: "transparent",
                          color: !highlighted ? "#4a443d" : confirmDeleteId === highlighted.id ? "#ff8478" : "#e0847a",
                          cursor: highlighted ? "pointer" : "not-allowed",
                          fontSize: 11,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {highlighted && confirmDeleteId === highlighted.id ? "Confirm?" : "Delete"}
                      </button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      {popupValuePill(
                        <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          {assetHref("nebula-skill-point") && <img src={assetHref("nebula-skill-point")} alt="" width={11} height={11} />}
                          {spent}/{pointPool}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {!isMobile && uiMode === "classic" && showPresetPanel && (() => {
          const classIconKey = CLASSES[classIdx].name.toLowerCase();
          const classIcon = assetHref(classIconKey);
          const thisClassPresets = PRESET_BUILDS.filter((g) => g.classIdx === classIdx).sort((a, b) => a.name.localeCompare(b.name));
          const otherClassPresets = PRESET_BUILDS
            .filter((g) => g.classIdx !== classIdx)
            .sort((a, b) => a.classIdx - b.classIdx || a.name.localeCompare(b.name));
          const highlightedPreset = PRESET_BUILDS.find((g) => g.id === activeGuideId) || null;

          const presetBox = (list, showClassIcon, emptyText) => (
            <div style={{ flex: 1, minWidth: 0, position: "relative", height: 82, borderRadius: 4, background: "rgba(15, 13, 11, 0.58)", overflow: "hidden" }}>
              <div className="popup-desc-scroll" style={{ height: "100%", overflowY: "auto", overflowX: "hidden", padding: "6px 16px 4px 8px" }}>
                {list.length === 0 ? (
                  <div style={{ fontSize: 11, color: MUTED }}>{emptyText}</div>
                ) : (
                  list.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => {
                        setActiveGuideId(g.id);
                        setClassIdx(g.classIdx);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 11,
                        color: activeGuideId === g.id ? GOLD : BRIGHT,
                        padding: "3px 0",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {showClassIcon && assetHref(CLASSES[g.classIdx].name.toLowerCase()) && (
                        <img
                          src={assetHref(CLASSES[g.classIdx].name.toLowerCase())}
                          alt=""
                          width={11}
                          height={11}
                          style={{ borderRadius: 2, flexShrink: 0 }}
                        />
                      )}
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                        {g.name.includes(" - ") ? g.name.split(" - ").slice(1).join(" - ") : g.name}
                      </span>
                    </div>
                  ))
                )}
                <div style={{ height: 16, flexShrink: 0 }} />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  bottom: 2,
                  width: 9,
                  borderRadius: 4,
                  backgroundImage: assetHref("nebula-skill-desc-bg3") ? `url(${assetHref("nebula-skill-desc-bg3")})` : undefined,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  pointerEvents: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "2px 0",
                }}
              >
                <div style={{ width: 0, height: 0, borderLeft: "3px solid transparent", borderRight: "3px solid transparent", borderBottom: "4px solid #8a7f6e" }} />
                <div style={{ width: 0, height: 0, borderLeft: "3px solid transparent", borderRight: "3px solid transparent", borderTop: "4px solid #8a7f6e" }} />
              </div>
            </div>
          );

          return (
            <div
              ref={presetPanelRef}
              style={{
                position: "fixed",
                left: "50%",
                bottom: 0,
                transform: "translateX(-50%)",
                width: "min(440px, 74vw)",
                height: "min(170px, 27vh)",
                overflow: "hidden",
                zIndex: 500,
                backgroundImage: assetHref("nebula-skill-panel-bg") ? `url(${assetHref("nebula-skill-panel-bg")})` : undefined,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                padding: 5,
                boxShadow: "0 -4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  gap: 10,
                  padding: "2px 8px 0px 8px",
                  minWidth: 0,
                  backgroundImage: assetHref("nebula-skill-panel-inner-bg") ? `url(${assetHref("nebula-skill-panel-inner-bg")})` : undefined,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Left column: class icon, Presets label */}
                <div style={{ width: 104, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {(() => {
                    const bgAsset = assetHref("detail-panel-bg");
                    const size = 40;
                    const bgW = 58;
                    const bgH = bgW * (169 / 152);
                    if (!classIcon && !bgAsset) return null;
                    return (
                      <div style={{ position: "relative", width: bgW, height: bgH, marginTop: 3, marginBottom: 3 }}>
                        {bgAsset && <img src={bgAsset} alt="" width={bgW} height={bgH} style={{ position: "absolute", top: -5, left: 0 }} />}
                        {classIcon && (
                          <img
                            src={classIcon}
                            alt=""
                            width={size * 0.78}
                            height={size * 0.78}
                            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                          />
                        )}
                      </div>
                    );
                  })()}
                  <div style={{ flex: 1 }} />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginBottom: 8 }}>
                    {popupValuePill("Presets")}
                  </div>
                </div>

                <div style={{ width: 1, alignSelf: "stretch", background: "#a19788", opacity: 0.35, flexShrink: 0 }} />

                {/* Right column: header, preset lists, apply/clear buttons */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>{popupValuePill("This class")}</div>
                    <div style={{ width: 18, flexShrink: 0 }} />
                    <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>{popupValuePill("Other classes")}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "stretch", gap: 0, position: "relative", minWidth: 0 }}>
                    {presetBox(thisClassPresets, false, "No presets for this class.")}
                    <div style={{ width: 18, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                      {assetHref("nebula-skill-desc-next-arrow") && <img src={assetHref("nebula-skill-desc-next-arrow")} alt="" width={14} height={15} />}
                    </div>
                    {presetBox(otherClassPresets, true, "No presets.")}
                  </div>
                  <div style={{ flex: 1 }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", marginTop: -15, marginBottom: -6 }}>
                    <div />
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => {
                          if (!highlightedPreset) return;
                          applyGuide(highlightedPreset);
                          setShowPresetPanel(false);
                        }}
                        disabled={!highlightedPreset}
                        title="Apply this preset - fills every step in order"
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 8,
                          border: "none",
                          background: "transparent",
                          color: highlightedPreset ? GOLD : "#4a443d",
                          cursor: highlightedPreset ? "pointer" : "not-allowed",
                          fontSize: 11,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Apply
                      </button>
                      <button
                        onClick={() => setActiveGuideId(null)}
                        disabled={!activeGuideId}
                        title="Clear selected preset"
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 8,
                          border: "none",
                          background: "transparent",
                          color: activeGuideId ? "#e0847a" : "#4a443d",
                          cursor: activeGuideId ? "pointer" : "not-allowed",
                          fontSize: 11,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Clear
                      </button>
                    </div>
                    <div />
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {!isMobile && uiMode === "classic" && !showCharacterPanel && !showPresetPanel && !selected && selectedStarId == null && (
          <div
            style={{
              position: "fixed",
              left: "50%",
              bottom: 0,
              transform: "translateX(-50%)",
              width: "min(440px, 74vw)",
              height: "min(170px, 27vh)",
              zIndex: 500,
              backgroundImage: assetHref("nebula-skill-panel-bg") ? `url(${assetHref("nebula-skill-panel-bg")})` : undefined,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              padding: 5,
              boxShadow: "0 -4px 20px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage: assetHref("nebula-skill-panel-inner-bg") ? `url(${assetHref("nebula-skill-panel-inner-bg")})` : undefined,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
              }}
            >
              <span style={{ fontSize: 12, color: MUTED }}>Select a node or star to view its details.</span>
            </div>
          </div>
        )}

        {!isMobile && uiMode === "classic" && !showCharacterPanel && !showPresetPanel && selected && selectedStarId == null && (() => {
          const rankIdx = Math.max(selectedRank, 1) - 1;
          const currentRank = selectedRank > 0 ? selected.ranks[rankIdx] : null;
          const nextRank = selectedRank < selected.maxRank ? selected.ranks[selectedRank] : null;
          const isMaxed = selectedRank >= selected.maxRank;
          const currentDesc = currentRank?.desc?.[classIdx] || (currentRank?.stat ?? null);
          const nextDesc = nextRank?.desc?.[classIdx] || (nextRank?.stat ?? null);
          const iconId = isKeystone(selected) ? selected.icon[classIdx] : selected.icon[0];
          const active = selectedRank > 0;
          const border = borderHref(selected.q, active);
          const icon = iconHref(iconId, active);
          const nodeName = selected.ranks[rankIdx >= 0 ? rankIdx : 0]?.name?.[classIdx] || "Unknown Skill";
          const descBox = (label, content, isNone) => popupDescBox(content, isNone);
          const valuePill = popupValuePill;

          return (
            <div
              ref={desktopPopupRef}
              style={{
                position: "fixed",
                left: "50%",
                bottom: 0,
                transform: "translateX(-50%)",
                width: "min(440px, 74vw)",
                height: "min(170px, 27vh)",
                overflowY: "hidden",
                overflowX: "hidden",
                zIndex: 500,
                backgroundImage: assetHref("nebula-skill-panel-bg") ? `url(${assetHref("nebula-skill-panel-bg")})` : undefined,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                padding: 5,
                boxShadow: "0 -4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  gap: 10,
                  padding: "2px 8px 0px 8px",
                  minWidth: 0,
                  backgroundImage: assetHref("nebula-skill-panel-inner-bg") ? `url(${assetHref("nebula-skill-panel-inner-bg")})` : undefined,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Left column: node icon, name, level (name+level aligned with button row) */}
                <div style={{ width: 104, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {(() => {
                    const bgAsset = assetHref("detail-panel-bg");
                    if (!border && !icon && !bgAsset) return null;
                    const size = 40;
                    const bgW = 58;
                    const bgH = bgW * (169 / 152);
                    return (
                      <div style={{ position: "relative", width: bgW, height: bgH, marginTop: 3, marginBottom: 3 }}>
                        {bgAsset && (
                          <img src={bgAsset} alt="" width={bgW} height={bgH} style={{ position: "absolute", top: -5, left: 0 }} />
                        )}
                        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: size, height: size }}>
                          {border && <img src={border} alt="" width={size} height={size} style={{ position: "absolute", top: selected.q === 2 || selected.q === 3 ? -1 : 0, left: selected.q === 1 || selected.q === 3 ? -1 : 0 }} />}
                          {selected.q === 1 && (
                            <div
                              style={{
                                position: "absolute", top: 1.5, left: 1.5, width: size - 3, height: size - 3,
                                borderRadius: "50%", border: `1.5px solid ${active ? GOLD : "#9a9488"}`,
                                opacity: active ? 0.95 : 0.8, pointerEvents: "none",
                              }}
                            />
                          )}
                          {icon && <img src={icon} alt="" width={size * 0.78} height={size * 0.78} style={{ position: "absolute", top: size * 0.11, left: size * 0.11 }} />}
                          {isKeystone(selected) &&
                            Array.from({ length: 6 }).map((_, i) => {
                              const angle = ((-90 + i * (360 / 6)) * Math.PI) / 180;
                              const dotR = (size / 2) * 0.855;
                              const dx = dotR * Math.cos(angle);
                              const dy = dotR * Math.sin(angle);
                              const lit = i < selectedRank - 1;
                              return (
                                <div
                                  key={i}
                                  style={{
                                    position: "absolute", left: size / 2 + dx - 2, top: size / 2 + dy - 2,
                                    width: 4, height: 4, borderRadius: "50%",
                                    background: lit ? GOLD : "#4a443d",
                                    boxShadow: lit ? "0 0 2px rgba(255,255,255,0.5)" : "none",
                                  }}
                                />
                              );
                            })}
                        </div>
                      </div>
                    );
                  })()}
                  {(selected.maxRank === 3 || selected.maxRank === 5) &&
                    (() => {
                      const myType = selected.ranks?.[0]?.attr?.[0]?.type;
                      if (myType == null) return null;
                      const isShowing = highlightType === myType;
                      return (
                        <button
                          onClick={() => setHighlightType(isShowing ? null : myType)}
                          title="Highlight every other node granting this same stat"
                          style={{
                            padding: "4px 10px", borderRadius: 6,
                            border: "1px solid #e0473d",
                            background: isShowing ? "#e0473d22" : "transparent",
                            color: "#ff8478",
                            fontSize: 11, whiteSpace: "nowrap",
                            cursor: "pointer",
                          }}
                        >
                          {isShowing ? "Hide all" : "Show all"}
                        </button>
                      );
                    })()}
                  <div style={{ flex: 1 }} />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginBottom: 8 }}>
                    {nameBadge(nodeName, BRIGHT)}
                    {valuePill(`Level ${selectedRank}`)}
                  </div>
                </div>

                <div style={{ width: 1, alignSelf: "stretch", background: "#a19788", opacity: 0.35, flexShrink: 0 }} />

                {/* Right column: header, desc boxes, buttons */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                  {isMaxed ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>{valuePill("Maxed")}</div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>{valuePill("Current level")}</div>
                      <div style={{ width: 22, flexShrink: 0 }} />
                      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>{valuePill("Next level")}</div>
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "stretch", gap: 0, position: "relative", minWidth: 0 }}>
                    {isMaxed ? (
                      descBox("Current", currentDesc, false)
                    ) : (
                      <>
                        {descBox("Current", currentDesc, selectedRank === 0)}
                        <div style={{ width: 22, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                          {assetHref("nebula-skill-desc-next-arrow") && (
                            <img src={assetHref("nebula-skill-desc-next-arrow")} alt="" width={18} height={19} />
                          )}
                        </div>
                        {descBox("Next", nextDesc, false)}
                      </>
                    )}
                  </div>
                  <div style={{ flex: 1 }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", marginTop: -15, marginBottom: -6 }}>
                    <div />
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => minOut(selected)}
                        disabled={(allocated[selected.id] || 0) <= 0}
                        title="Min"
                        style={{
                          width: 44, height: 44, borderRadius: 8, border: "none", background: "transparent",
                          color: (allocated[selected.id] || 0) > 0 ? "#e0847a" : "#4a443d",
                          cursor: (allocated[selected.id] || 0) > 0 ? "pointer" : "not-allowed",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {assetHref("min-btn") && <img src={assetHref("min-btn")} alt="Min" width={19} height={19} style={{ opacity: (allocated[selected.id] || 0) > 0 ? 1 : 0.4 }} />}
                      </button>
                      <button
                        onClick={() => deallocate(selected)}
                        disabled={!canDeallocate(selected)}
                        title="Remove"
                        style={{
                          width: 44, height: 44, borderRadius: 8, border: "none", background: "transparent",
                          color: canDeallocate(selected) ? BRIGHT : "#4a443d",
                          cursor: canDeallocate(selected) ? "pointer" : "not-allowed",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {assetHref("decrease-btn") && <img src={assetHref("decrease-btn")} alt="Remove" width={19} height={19} style={{ opacity: canDeallocate(selected) ? 1 : 0.4 }} />}
                      </button>
                      <button
                        onClick={() => allocate(selected)}
                        disabled={!canAllocate(selected)}
                        title="Add - adds 1 point here, auto-pathing through any prerequisites needed"
                        style={{
                          width: 44, height: 44, borderRadius: 8, border: "none",
                          background: "transparent",
                          color: canAllocate(selected) ? GOLD : "#4a443d",
                          cursor: canAllocate(selected) ? "pointer" : "not-allowed",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {assetHref("increase-btn") && <img src={assetHref("increase-btn")} alt="Add" width={19} height={19} />}
                      </button>
                      <button
                        onClick={() => maxOut(selected)}
                        disabled={selectedMaxCost <= 0}
                        title="Max - fills this node and the cheapest valid path to it"
                        style={{
                          width: 44, height: 44, borderRadius: 8, border: "none", background: "transparent",
                          color: selectedMaxCost > 0 ? BRONZE : "#4a443d",
                          cursor: selectedMaxCost > 0 ? "pointer" : "not-allowed",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {assetHref("max-btn") && <img src={assetHref("max-btn")} alt="Max" width={19} height={19} style={{ opacity: selectedMaxCost > 0 ? 1 : 0.4 }} />}
                      </button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      {valuePill(
                        <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          {assetHref("nebula-skill-point") && <img src={assetHref("nebula-skill-point")} alt="" width={11} height={11} />}
                          {spent}/{pointPool}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {!isMobile && uiMode === "classic" && !showCharacterPanel && !showPresetPanel && selectedStarId != null && (() => {
          const starLevel = starLevels[selectedStarId] || 0;
          const isMaxed = starLevel >= 49;
          const currentLabel = starLevelLabel(starLevel);
          const nextLabel = starLevelLabel(Math.min(starLevel + 1, 49));
          const c = STAR_IDS.indexOf(selectedStarId) + 1;
          const starIcon = assetHref(`n${c}`);
          const starName = STAR_NAMES[c - 1];
          const descBox = popupDescBox;
          const valuePill = popupValuePill;

          return (
            <div
              ref={desktopPopupRef}
              style={{
                position: "fixed",
                left: "50%",
                bottom: 0,
                transform: "translateX(-50%)",
                width: "min(440px, 74vw)",
                height: "min(170px, 27vh)",
                overflowY: "hidden",
                overflowX: "hidden",
                zIndex: 500,
                backgroundImage: assetHref("nebula-skill-panel-bg") ? `url(${assetHref("nebula-skill-panel-bg")})` : undefined,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                padding: 5,
                boxShadow: "0 -4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  gap: 10,
                  padding: "2px 8px 0px 8px",
                  minWidth: 0,
                  backgroundImage: assetHref("nebula-skill-panel-inner-bg") ? `url(${assetHref("nebula-skill-panel-inner-bg")})` : undefined,
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Left column: star icon, name, level (name+level aligned with button row) */}
                <div style={{ width: 104, flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  {(() => {
                    const bgAsset = assetHref("detail-panel-bg");
                    if (!starIcon && !bgAsset) return null;
                    const size = 40;
                    const bgW = 58;
                    const bgH = bgW * (169 / 152);
                    return (
                      <div style={{ position: "relative", width: bgW, height: bgH, marginTop: 3, marginBottom: 3 }}>
                        {bgAsset && (
                          <img src={bgAsset} alt="" width={bgW} height={bgH} style={{ position: "absolute", top: -5, left: 0 }} />
                        )}
                        {starIcon && (
                          <img
                            src={starIcon}
                            alt=""
                            width={size * 0.6}
                            height={size * 0.6}
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            }}
                          />
                        )}
                      </div>
                    );
                  })()}
                  <div style={{ flex: 1 }} />
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, marginBottom: 8 }}>
                    {nameBadge(starName, "#8ec3f0")}
                    {valuePill(`Level ${currentLabel}`)}
                  </div>
                </div>

                <div style={{ width: 1, alignSelf: "stretch", background: "#a19788", opacity: 0.35, flexShrink: 0 }} />

                {/* Right column: header, tier boxes, buttons */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                  {isMaxed ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>{valuePill("Maxed")}</div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>{valuePill("Current level")}</div>
                      <div style={{ width: 22, flexShrink: 0 }} />
                      <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>{valuePill("Next level")}</div>
                    </div>
                  )}
                  <div style={{ display: "flex", alignItems: "stretch", gap: 0, position: "relative", minWidth: 0 }}>
                    {isMaxed ? (
                      descBox(starLevelLabel(49), false)
                    ) : (
                      <>
                        {descBox(currentLabel, false)}
                        <div style={{ width: 22, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                          {assetHref("nebula-skill-desc-next-arrow") && (
                            <img src={assetHref("nebula-skill-desc-next-arrow")} alt="" width={18} height={19} />
                          )}
                        </div>
                        {descBox(nextLabel, false)}
                      </>
                    )}
                  </div>
                  <div style={{ flex: 1 }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", marginTop: -15, marginBottom: -6 }}>
                    <div />
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => setStarLevels((prev) => ({ ...prev, [selectedStarId]: 0 }))}
                        disabled={starLevel <= 0}
                        title="Min"
                        style={{
                          width: 44, height: 44, borderRadius: 8, border: "none", background: "transparent",
                          color: starLevel > 0 ? "#e0847a" : "#4a443d",
                          cursor: starLevel > 0 ? "pointer" : "not-allowed",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {assetHref("min-btn") && <img src={assetHref("min-btn")} alt="Min" width={19} height={19} style={{ opacity: starLevel > 0 ? 1 : 0.4 }} />}
                      </button>
                      <button
                        onClick={() => setStarLevels((prev) => ({ ...prev, [selectedStarId]: Math.max(0, (prev[selectedStarId] || 0) - 1) }))}
                        disabled={starLevel <= 0}
                        title="Remove"
                        style={{
                          width: 44, height: 44, borderRadius: 8, border: "none", background: "transparent",
                          color: starLevel > 0 ? BRIGHT : "#4a443d",
                          cursor: starLevel > 0 ? "pointer" : "not-allowed",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {assetHref("decrease-btn") && <img src={assetHref("decrease-btn")} alt="Remove" width={19} height={19} style={{ opacity: starLevel > 0 ? 1 : 0.4 }} />}
                      </button>
                      <button
                        onClick={() => setStarLevels((prev) => ({ ...prev, [selectedStarId]: Math.min(49, (prev[selectedStarId] || 0) + 1) }))}
                        disabled={starLevel >= 49}
                        title="Add"
                        style={{
                          width: 44, height: 44, borderRadius: 8, border: "none",
                          background: "transparent",
                          color: starLevel < 49 ? GOLD : "#4a443d",
                          cursor: starLevel < 49 ? "pointer" : "not-allowed",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {assetHref("increase-btn") && <img src={assetHref("increase-btn")} alt="Add" width={19} height={19} />}
                      </button>
                      <button
                        onClick={() => setStarLevels((prev) => ({ ...prev, [selectedStarId]: 49 }))}
                        disabled={starLevel >= 49}
                        title="Max"
                        style={{
                          width: 44, height: 44, borderRadius: 8, border: "none", background: "transparent",
                          color: starLevel < 49 ? BRONZE : "#4a443d",
                          cursor: starLevel < 49 ? "pointer" : "not-allowed",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        {assetHref("max-btn") && <img src={assetHref("max-btn")} alt="Max" width={19} height={19} style={{ opacity: starLevel < 49 ? 1 : 0.4 }} />}
                      </button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                      {valuePill(
                        <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                          {assetHref("nebula-skill-point") && <img src={assetHref("nebula-skill-point")} alt="" width={11} height={11} />}
                          {spent}/{pointPool}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {showNebulaDetail && (
        <div
          onClick={() => setShowNebulaDetail(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 900,
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "min(304px, 90vw)",
              height: "min(410px, 88vh)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              backgroundImage: assetHref("nebula-detail-panel-bg")
                ? `url(${assetHref("nebula-detail-panel-bg")})`
                : undefined,
              backgroundColor: !assetHref("nebula-detail-panel-bg") ? "#1a1512" : undefined,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              border: !assetHref("nebula-detail-panel-bg") ? `1px solid ${BRONZE}` : undefined,
              borderRadius: !assetHref("nebula-detail-panel-bg") ? 10 : undefined,
              padding: "34px 26px 26px",
            }}
          >
            <button
              onClick={() => setShowNebulaDetail(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 20,
                background: "transparent",
                border: "none",
                color: BRIGHT,
                fontSize: 18,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              &times;
            </button>

            <div style={{ display: "flex", alignItems: "center", marginBottom: 14, flexShrink: 0 }}>
              <span className="talent-title" style={{ fontSize: 15, color: GOLD }}>
                Nebula Stars
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 4,
                marginBottom: 8,
                flexShrink: 0,
              }}
            >
              {STAR_IDS.slice(0, 6).map((id, idx) => {
                const level = starLevels[id] || 0;
                const icon = assetHref(`n${idx + 1}`);
                return (
                  <div
                    key={id}
                    onClick={() => {
                      setSelectedStarId(id);
                      setSelectedId(null);
                    }}
                    style={{
                      background: "#15100c",
                      border: `1px solid ${selectedStarId === id ? GOLD : "#33291f"}`,
                      borderRadius: 8,
                      padding: "4px 3px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                      cursor: "pointer",
                    }}
                  >
                    {icon && <img src={icon} alt="" width={13} height={13} style={{ borderRadius: 3 }} />}
                    <span style={{ fontSize: 8, color: BRIGHT, textAlign: "center" }}>{STAR_NAMES[idx]}</span>
                    <select
                      value={level}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        setStarLevels((prev) => ({ ...prev, [id]: Number(e.target.value) }))
                      }
                      style={{
                        width: "100%",
                        background: "#221b16",
                        border: "1px solid #3a322b",
                        borderRadius: 4,
                        color: level > 0 ? GOLD : MUTED,
                        fontSize: 8,
                        padding: "1px 2px",
                        textAlign: "center",
                        textAlignLast: "center",
                      }}
                    >
                      <optgroup label="Tier 0">
                        <option value={0}>{starLevelLabel(0)}</option>
                      </optgroup>
                      {Array.from({ length: 7 }).map((_, tier) => (
                        <optgroup key={tier} label={`Tier ${tier + 1}`}>
                          {Array.from({ length: 7 }).map((_, sub) => {
                            const lvl = tier * 7 + sub + 1;
                            return (
                              <option key={lvl} value={lvl}>
                                {starLevelLabel(lvl)}
                              </option>
                            );
                          })}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                );
              })}
              {(() => {
                const idx = 6;
                const id = STAR_IDS[idx];
                const level = starLevels[id] || 0;
                const icon = assetHref(`n${idx + 1}`);
                return (
                  <div
                    key={id}
                    onClick={() => {
                      setSelectedStarId(id);
                      setSelectedId(null);
                    }}
                    style={{
                      background: "#15100c",
                      border: `1px solid ${selectedStarId === id ? GOLD : "#33291f"}`,
                      borderRadius: 8,
                      padding: "4px 3px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                      cursor: "pointer",
                    }}
                  >
                    {icon && <img src={icon} alt="" width={13} height={13} style={{ borderRadius: 3 }} />}
                    <span style={{ fontSize: 8, color: BRIGHT, textAlign: "center" }}>{STAR_NAMES[idx]}</span>
                    <select
                      value={level}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        setStarLevels((prev) => ({ ...prev, [id]: Number(e.target.value) }))
                      }
                      style={{
                        width: "100%",
                        background: "#221b16",
                        border: "1px solid #3a322b",
                        borderRadius: 4,
                        color: level > 0 ? GOLD : MUTED,
                        fontSize: 8,
                        padding: "1px 2px",
                        textAlign: "center",
                        textAlignLast: "center",
                      }}
                    >
                      <optgroup label="Tier 0">
                        <option value={0}>{starLevelLabel(0)}</option>
                      </optgroup>
                      {Array.from({ length: 7 }).map((_, tier) => (
                        <optgroup key={tier} label={`Tier ${tier + 1}`}>
                          {Array.from({ length: 7 }).map((_, sub) => {
                            const lvl = tier * 7 + sub + 1;
                            return (
                              <option key={lvl} value={lvl}>
                                {starLevelLabel(lvl)}
                              </option>
                            );
                          })}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                );
              })()}
              <button
                onClick={resetStarsOnly}
                style={{
                  background: "#15100c",
                  border: "1px solid #33291f",
                  borderRadius: 8,
                  padding: "4px 3px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                  cursor: "pointer",
                }}
              >
                {assetHref("n8") && (
                  <div
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: "50%",
                      background: "transparent",
                      border: "1.5px solid #6fa8dc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}
                  >
                    <img src={assetHref("n8")} alt="" width={13} height={13} style={{ borderRadius: "50%" }} />
                  </div>
                )}
                <span style={{ fontSize: 7, color: BRIGHT, textAlign: "center", lineHeight: 1.1 }}>Reset Star Nodes</span>
              </button>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: "auto",
                minHeight: 0,
                background: "rgba(0,0,0,0.28)",
                border: "1px solid #33291f",
                borderRadius: 8,
                padding: "10px 12px",
              }}
            >
            {Object.keys(allocated).length === 0 ? (
              <div style={{ fontSize: 12, color: MUTED, marginBottom: 16 }}>No points allocated yet.</div>
            ) : (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {Object.entries(allocated)
                    .filter(([, rank]) => rank > 0)
                    .map(([id, rank]) => [nodeById(Number(id)), rank])
                    .filter(([n]) => n && isKeystone(n))
                    .sort((a, b) => skillSlot(a[0]) - skillSlot(b[0]))
                    .map(([n, rank]) => {
                      const rankData = n.ranks[Math.min(rank, n.ranks.length) - 1];
                      const label = rankData?.name?.[classIdx] || `Node #${n.id}`;
                      const effect = rankData?.stat || rankData?.desc?.[classIdx];
                      return (
                        <div
                          key={n.id}
                          onClick={() => {
                            setSelectedId(n.id);
                            setSelectedStarId(null);
                            setShowNebulaDetail(false);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            style={{
                              fontSize: 12,
                              color: rank >= n.maxRank ? GOLD : BRIGHT,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {label}
                          </div>
                          {effect && <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{effect}</div>}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            <div style={{ height: 1, background: "#3a322b", margin: "10px 0" }} />

            {(() => {
              const totals = allStatTotals(allocated, classIdx);
              if (totals.length === 0) {
                return <div style={{ fontSize: 12, color: MUTED }}>No stats yet.</div>;
              }
              return (
                <div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {totals.map((t) => {
                      const isHighlighted = highlightType === t.type;
                      return (
                        <div
                          key={t.type}
                          onClick={() => setHighlightType(isHighlighted ? null : t.type)}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: 12,
                            fontFamily: "monospace",
                            color: isHighlighted ? "#ff8478" : BRONZE,
                            cursor: "pointer",
                            padding: "2px 4px",
                            borderRadius: 4,
                            background: isHighlighted ? "#e0473d22" : "transparent",
                          }}
                          title="Click to highlight this stat's nodes on the tree"
                        >
                          <span>{t.label}</span>
                          <span>
                            {t.value >= 0 ? "+" : ""}
                            {t.display}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
            </div>
          </div>
        </div>
      )}

      {showCredits && (
        <div
          onClick={() => setShowCredits(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#1a1512",
              border: `1px solid ${BRONZE}`,
              borderRadius: 10,
              padding: "24px 28px",
              maxWidth: 380,
              width: "90%",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowCredits(false)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "transparent",
                border: "none",
                color: MUTED,
                fontSize: 16,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              &times;
            </button>
            <div className="talent-title" style={{ fontSize: 16, color: GOLD, marginBottom: 16 }}>
              Credits
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 13, color: BRIGHT }}>
              <div>Made by <span style={{ color: BRONZE }}>Supreme</span></div>
              <div>Original tree planner by <span style={{ color: BRONZE }}>David Tai</span></div>
              <div>Assassin and Archer skills provided by <span style={{ color: BRONZE }}>Grrravity</span></div>
              <div>Assassin and Archer icons made by <span style={{ color: BRONZE }}>Gemini AI</span></div>
              <div>Coded with <span style={{ color: BRONZE }}>Claude AI</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

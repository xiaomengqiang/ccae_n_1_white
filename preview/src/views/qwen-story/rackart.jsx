import FigmaAsset from "../../components/figma-asset/index.jsx";
export default function RackArt({active="D-08",healthy=false}){
 function cellState(rack,kind,row,right){const names=rack===12?["P-01","P-02","D-01","D-02","D-03","D-04","D-05","D-06"]:["D-07",null,"D-08"];const name=names[row];return !name?"unmapped":name==="D-08"&&kind==="C"&&right&&!healthy?"fault-cell":name===active?"linked":"muted";}
 return (
    <div className="qw-layer-0" data-node-id="2972:106912" data-name="背景图案">
      <FigmaAsset file="35206.svg" />
      <div className="qw-layer-2" data-node-id="I2972:106912;130:721" data-name="Frame">
        <div className="qw-layer-3" data-node-id="I2972:106912;130:1048" data-name="Group">
          <div className="qw-layer-3" data-node-id="I2972:106912;130:1049" data-name="Group">
            <div className="qw-layer-4" data-node-id="I2972:106912;130:1050" data-name="Vector">
              <div className="qw-layer-5">
                <FigmaAsset file="a49ea.svg" />
              </div>
            </div>
            <div className="qw-layer-7" data-node-id="I2972:106912;130:1051" data-name="Vector">
              <div className="qw-layer-8">
                <FigmaAsset file="c493e.svg" />
              </div>
            </div>
            <div className="qw-layer-9" data-node-id="I2972:106912;130:1052" data-name="Vector">
              <div className="qw-layer-10">
                <FigmaAsset file="cb5e3.svg" />
              </div>
            </div>
            <div className="qw-layer-11" data-node-id="I2972:106912;130:1053" data-name="Vector">
              <div className="qw-layer-10">
                <FigmaAsset file="a4ad2.svg" />
              </div>
            </div>
            <div className="qw-layer-12" data-node-id="I2972:106912;130:1054" data-name="Vector">
              <FigmaAsset file="63312.svg" />
            </div>
            <div className="qw-layer-13" data-node-id="I2972:106912;130:1055" data-name="Vector">
              <FigmaAsset file="d96f7.svg" />
            </div>
            <div className="qw-layer-14" data-node-id="I2972:106912;130:1056" data-name="Vector">
              <div className="qw-layer-15">
                <FigmaAsset file="fcd47.svg" />
              </div>
            </div>
            <div className="qw-layer-16" data-node-id="I2972:106912;130:1057" data-name="Vector">
              <FigmaAsset file="902ef.svg" />
            </div>
            <div className="qw-layer-17" data-node-id="I2972:106912;130:1058" data-name="Vector">
              <div className="qw-layer-18">
                <FigmaAsset file="5d028.svg" />
              </div>
            </div>
            <div className="qw-layer-19" data-node-id="I2972:106912;130:1059" data-name="Vector">
              <FigmaAsset file="922d3.svg" />
            </div>
            <div className="qw-layer-20" data-node-id="I2972:106912;130:1060" data-name="Vector">
              <FigmaAsset file="922d3.svg" />
            </div>
            <div className="qw-layer-21" data-node-id="I2972:106912;130:1061" data-name="Vector">
              <div className="qw-layer-22">
                <FigmaAsset file="12da0.svg" />
              </div>
            </div>
            <div className="qw-layer-23" data-node-id="I2972:106912;130:1062" data-name="Vector">
              <FigmaAsset file="225a8.svg" />
            </div>
            <div className="qw-layer-24" data-node-id="I2972:106912;130:1063" data-name="Vector">
              <FigmaAsset file="65cde.svg" />
            </div>
            <div className="qw-layer-25" data-node-id="I2972:106912;130:1064" data-name="Vector">
              <FigmaAsset file="8ac93.svg" />
            </div>
            <div className="qw-layer-26" data-node-id="I2972:106912;130:1065" data-name="Vector">
              <FigmaAsset file="8bc95.svg" />
            </div>
            <div className="qw-layer-27" data-node-id="I2972:106912;130:1066" data-name="Vector">
              <FigmaAsset file="8bc95.svg" />
            </div>
            <div className="qw-layer-28" data-node-id="I2972:106912;130:1067" data-name="Vector">
              <FigmaAsset file="8bc95.svg" />
            </div>
            <div className="qw-layer-29" data-node-id="I2972:106912;130:1068" data-name="Vector">
              <FigmaAsset file="8bc95.svg" />
            </div>
            <div className="qw-layer-30" data-node-id="I2972:106912;130:1069" data-name="Vector">
              <FigmaAsset file="8bc95.svg" />
            </div>
            <div className="qw-layer-31" data-node-id="I2972:106912;130:1070" data-name="Vector">
              <FigmaAsset file="8bc95.svg" />
            </div>
            <div className="qw-layer-32" data-node-id="I2972:106912;130:1071" data-name="Vector">
              <div className="qw-layer-33">
                <FigmaAsset file="f4d90.svg" />
              </div>
            </div>
            <div className="qw-layer-34" data-node-id="I2972:106912;130:1072" data-name="Vector">
              <div className="qw-layer-22">
                <FigmaAsset file="b3fb1.svg" />
              </div>
            </div>
            <div className="qw-layer-35" data-node-id="I2972:106912;130:1073" data-name="Vector">
              <FigmaAsset file="5df92.svg" />
            </div>
            <div className="qw-layer-36" data-node-id="I2972:106912;130:1074" data-name="Vector">
              <FigmaAsset file="08d40.svg" />
            </div>
            <div className="qw-layer-37" data-node-id="I2972:106912;130:1075" data-name="Vector">
              <FigmaAsset file="4dc3a.svg" />
            </div>
            <div className="qw-layer-38" data-node-id="I2972:106912;130:1076" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-39" data-node-id="I2972:106912;130:1077" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-40" data-node-id="I2972:106912;130:1078" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-41" data-node-id="I2972:106912;130:1079" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-42" data-node-id="I2972:106912;130:1080" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-43" data-node-id="I2972:106912;130:1081" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-44" data-node-id="I2972:106912;130:1082" data-name="Vector">
              <div className="qw-layer-33">
                <FigmaAsset file="a8b1a.svg" />
              </div>
            </div>
            <div className="qw-layer-45" data-node-id="I2972:106912;130:1083" data-name="Vector">
              <div className="qw-layer-22">
                <FigmaAsset file="17286.svg" />
              </div>
            </div>
            <div className="qw-layer-46" data-node-id="I2972:106912;130:1084" data-name="Vector">
              <FigmaAsset file="d66c6.svg" />
            </div>
            <div className="qw-layer-47" data-node-id="I2972:106912;130:1085" data-name="Vector">
              <FigmaAsset file="08d40.svg" />
            </div>
            <div className="qw-layer-48" data-node-id="I2972:106912;130:1086" data-name="Vector">
              <FigmaAsset file="4dc3a.svg" />
            </div>
            <div className="qw-layer-49" data-node-id="I2972:106912;130:1087" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-50" data-node-id="I2972:106912;130:1088" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-51" data-node-id="I2972:106912;130:1089" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-52" data-node-id="I2972:106912;130:1090" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-53" data-node-id="I2972:106912;130:1091" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-54" data-node-id="I2972:106912;130:1092" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-55" data-node-id="I2972:106912;130:1093" data-name="Vector">
              <div className="qw-layer-33">
                <FigmaAsset file="a8b1a.svg" />
              </div>
            </div>
            <div className="qw-layer-56" data-node-id="I2972:106912;130:1094" data-name="Vector">
              <div className="qw-layer-22">
                <FigmaAsset file="83d64.svg" />
              </div>
            </div>
            <div className="qw-layer-57" data-node-id="I2972:106912;130:1095" data-name="Vector">
              <FigmaAsset file="7d064.svg" />
            </div>
            <div className="qw-layer-58" data-node-id="I2972:106912;130:1096" data-name="Vector">
              <FigmaAsset file="ef9d0.svg" />
            </div>
            <div className="qw-layer-59" data-node-id="I2972:106912;130:1097" data-name="Vector">
              <FigmaAsset file="43649.svg" />
            </div>
            <div className="qw-layer-60" data-node-id="I2972:106912;130:1098" data-name="Vector">
              <FigmaAsset file="15ea4.svg" />
            </div>
            <div className="qw-layer-61" data-node-id="I2972:106912;130:1099" data-name="Vector">
              <FigmaAsset file="15ea4.svg" />
            </div>
            <div className="qw-layer-62" data-node-id="I2972:106912;130:1100" data-name="Vector">
              <FigmaAsset file="15ea4.svg" />
            </div>
            <div className="qw-layer-63" data-node-id="I2972:106912;130:1101" data-name="Vector">
              <FigmaAsset file="15ea4.svg" />
            </div>
            <div className="qw-layer-64" data-node-id="I2972:106912;130:1102" data-name="Vector">
              <FigmaAsset file="15ea4.svg" />
            </div>
            <div className="qw-layer-65" data-node-id="I2972:106912;130:1103" data-name="Vector">
              <FigmaAsset file="15ea4.svg" />
            </div>
            <div className="qw-layer-66" data-node-id="I2972:106912;130:1104" data-name="Vector">
              <div className="qw-layer-33">
                <FigmaAsset file="a8b1a.svg" />
              </div>
            </div>
            <p className="qw-layer-67" data-node-id="I2972:106912;130:1105">
              电源框
            </p>
            <div className="qw-layer-68" data-node-id="I2972:106912;130:1106" data-name="Vector">
              <div className="qw-layer-69">
                <FigmaAsset file="42354.svg" />
              </div>
            </div>
            <div className="qw-layer-70" data-node-id="I2972:106912;130:1107" data-name="Vector">
              <FigmaAsset file="93376.svg" />
            </div>
            <div className="qw-layer-71" data-node-id="I2972:106912;130:1108" data-name="Vector">
              <FigmaAsset file="d7f86.svg" />
            </div>
            <p className="qw-layer-72" data-node-id="I2972:106912;130:1109">
              管理刀片
            </p>
            <div className="qw-layer-73" data-node-id="I2972:106912;130:1110" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="783a7.svg" />
              </div>
            </div>
            <div className="qw-layer-75" data-node-id="I2972:106912;130:1111" data-name="Vector">
              <FigmaAsset file="638f3.svg" />
            </div>
            <div className="qw-layer-76" data-node-id="I2972:106912;130:1112" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <div className="qw-layer-77" data-node-id="I2972:106912;130:1115" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="783a7.svg" />
              </div>
            </div>
            <div className="qw-layer-78" data-node-id="I2972:106912;130:1116" data-name="Vector">
              <FigmaAsset file="638f3.svg" />
            </div>
            <div className="qw-layer-79" data-node-id="I2972:106912;130:1117" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <div className="qw-layer-80" data-node-id="I2972:106912;130:1120" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="783a7.svg" />
              </div>
            </div>
            <div className="qw-layer-81" data-node-id="I2972:106912;130:1121" data-name="Vector">
              <FigmaAsset file="638f3.svg" />
            </div>
            <div className="qw-layer-82" data-node-id="I2972:106912;130:1122" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <div className="qw-layer-83" data-node-id="I2972:106912;130:1125" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="783a7.svg" />
              </div>
            </div>
            <div className="qw-layer-84" data-node-id="I2972:106912;130:1126" data-name="Vector">
              <FigmaAsset file="d57cf.svg" />
            </div>
            <div className="qw-layer-85" data-node-id="I2972:106912;130:1127" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <div className="qw-layer-86" data-node-id="I2972:106912;130:1130" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="14a1c.svg" />
              </div>
            </div>
            <div className="qw-layer-88" data-node-id="I2972:106912;130:1131" data-name="Vector">
              <FigmaAsset file="d57cf.svg" />
            </div>
            <div className="qw-layer-89" data-node-id="I2972:106912;130:1132" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <div className="qw-layer-90" data-node-id="I2972:106912;130:1135" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="14a1c.svg" />
              </div>
            </div>
            <div className="qw-layer-91" data-node-id="I2972:106912;130:1136" data-name="Vector">
              <FigmaAsset file="d57cf.svg" />
            </div>
            <div className="qw-layer-92" data-node-id="I2972:106912;130:1137" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <div className="qw-layer-93" data-node-id="I2972:106912;130:1140" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="14a1c.svg" />
              </div>
            </div>
            <div className="qw-layer-94" data-node-id="I2972:106912;130:1141" data-name="Vector">
              <FigmaAsset file="d57cf.svg" />
            </div>
            <div className="qw-layer-95" data-node-id="I2972:106912;130:1142" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <div className="qw-layer-96" data-node-id="I2972:106912;130:1145" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="2463e.svg" />
              </div>
            </div>
            <div className="qw-layer-97" data-node-id="I2972:106912;130:1146" data-name="Vector">
              <FigmaAsset file="d57cf.svg" />
            </div>
            <div className="qw-layer-98" data-node-id="I2972:106912;130:1147" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-99" data-node-id="I2972:106912;130:1150" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="bcca1.svg" />
              </div>
            </div>
            <div className="qw-layer-100" data-node-id="I2972:106912;130:1151" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-101" data-node-id="I2972:106912;130:1152" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-102" data-node-id="I2972:106912;130:1155" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="bcca1.svg" />
              </div>
            </div>
            <div className="qw-layer-103" data-node-id="I2972:106912;130:1156" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-104" data-node-id="I2972:106912;130:1157" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-105" data-node-id="I2972:106912;130:1160" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="bcca1.svg" />
              </div>
            </div>
            <div className="qw-layer-106" data-node-id="I2972:106912;130:1161" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-107" data-node-id="I2972:106912;130:1162" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-108" data-node-id="I2972:106912;130:1165" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="bcca1.svg" />
              </div>
            </div>
            <div className="qw-layer-109" data-node-id="I2972:106912;130:1166" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-110" data-node-id="I2972:106912;130:1167" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-111" data-node-id="I2972:106912;130:1170" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="2b1c3.svg" />
              </div>
            </div>
            <div className="qw-layer-112" data-node-id="I2972:106912;130:1171" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-113" data-node-id="I2972:106912;130:1172" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-114" data-node-id="I2972:106912;130:1175" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="2b1c3.svg" />
              </div>
            </div>
            <div className="qw-layer-115" data-node-id="I2972:106912;130:1176" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-116" data-node-id="I2972:106912;130:1177" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-117" data-node-id="I2972:106912;130:1180" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="2b1c3.svg" />
              </div>
            </div>
            <div className="qw-layer-118" data-node-id="I2972:106912;130:1181" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-119" data-node-id="I2972:106912;130:1182" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-120" data-node-id="I2972:106912;130:1185" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="2b1c3.svg" />
              </div>
            </div>
            <div className="qw-layer-121" data-node-id="I2972:106912;130:1186" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-122" data-node-id="I2972:106912;130:1187" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-123" data-node-id="I2972:106912;130:1190" data-name="Vector">
              <div className="qw-layer-124">
                <FigmaAsset file="179ac.svg" />
              </div>
            </div>
            <div className="qw-layer-125" data-node-id="I2972:106912;130:1191" data-name="Vector">
              <FigmaAsset file="d57cf.svg" />
            </div>
            <div className="qw-layer-126" data-node-id="I2972:106912;130:1192" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <p className="qw-layer-127" data-node-id="I2972:106912;130:1193">
              RoCE板
            </p>
            <div className="qw-layer-128" data-node-id="I2972:106912;130:1194" data-name="Vector">
              <div className="qw-layer-124">
                <FigmaAsset file="099cd.svg" />
              </div>
            </div>
            <div className="qw-layer-129" data-node-id="I2972:106912;130:1195" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-130" data-node-id="I2972:106912;130:1196" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <p className="qw-layer-131" data-node-id="I2972:106912;130:1197">
              RoCE板
            </p>
          </div>
          <div className={"qw-layer-132 qw-rack-cell "+cellState(12,"C",0,false)} data-node-id="I2972:106912;130:1214" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="9a5ff.svg" />
            </div>
          </div>
          <p className={"qw-layer-134 qw-rack-letter "+cellState(12,"C",0,false)} data-node-id="I2972:106912;130:1215">
            C
          </p>
          <div className={"qw-layer-135 qw-rack-cell "+cellState(12,"C",0,true)} data-node-id="I2972:106912;130:1216" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="3be16.svg" />
            </div>
          </div>
          <p className={"qw-layer-136 qw-rack-letter "+cellState(12,"C",0,true)} data-node-id="I2972:106912;130:1217">
            C
          </p>
          <div className={"qw-layer-137 qw-rack-cell "+cellState(12,"C",1,false)} data-node-id="I2972:106912;130:1218" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="9a5ff.svg" />
            </div>
          </div>
          <p className={"qw-layer-138 qw-rack-letter "+cellState(12,"C",1,false)} data-node-id="I2972:106912;130:1219">
            C
          </p>
          <div className={"qw-layer-139 qw-rack-cell "+cellState(12,"C",1,true)} data-node-id="I2972:106912;130:1220" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="3be16.svg" />
            </div>
          </div>
          <p className={"qw-layer-140 qw-rack-letter "+cellState(12,"C",1,true)} data-node-id="I2972:106912;130:1221">
            C
          </p>
          <div className={"qw-layer-141 qw-rack-cell "+cellState(12,"C",2,false)} data-node-id="I2972:106912;130:1222" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="102b1.svg" />
            </div>
          </div>
          <p className={"qw-layer-142 qw-rack-letter "+cellState(12,"C",2,false)} data-node-id="I2972:106912;130:1223">
            C
          </p>
          <div className={"qw-layer-143 qw-rack-cell "+cellState(12,"C",2,true)} data-node-id="I2972:106912;130:1224" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="e0cfc.svg" />
            </div>
          </div>
          <p className={"qw-layer-144 qw-rack-letter "+cellState(12,"C",2,true)} data-node-id="I2972:106912;130:1225">
            C
          </p>
          <div className={"qw-layer-145 qw-rack-cell "+cellState(12,"C",3,false)} data-node-id="I2972:106912;130:1226" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="102b1.svg" />
            </div>
          </div>
          <p className={"qw-layer-146 qw-rack-letter "+cellState(12,"C",3,false)} data-node-id="I2972:106912;130:1227">
            C
          </p>
          <div className={"qw-layer-147 qw-rack-cell "+cellState(12,"C",3,true)} data-node-id="I2972:106912;130:1228" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="e0cfc.svg" />
            </div>
          </div>
          <p className={"qw-layer-148 qw-rack-letter "+cellState(12,"C",3,true)} data-node-id="I2972:106912;130:1229">
            C
          </p>
          <div className={"qw-layer-149 qw-rack-cell "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1230" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-151 qw-rack-letter "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1231">
            N
          </p>
          <div className={"qw-layer-152 qw-rack-cell "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1232" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-154 qw-rack-letter "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1233">
            N
          </p>
          <div className={"qw-layer-155 qw-rack-cell "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1234" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-156 qw-rack-letter "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1235">
            N
          </p>
          <div className={"qw-layer-157 qw-rack-cell "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1236" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-158 qw-rack-letter "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1237">
            N
          </p>
          <div className={"qw-layer-159 qw-rack-cell "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1238" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-160 qw-rack-letter "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1239">
            N
          </p>
          <div className={"qw-layer-161 qw-rack-cell "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1240" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-162 qw-rack-letter "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1241">
            N
          </p>
          <div className={"qw-layer-163 qw-rack-cell "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1242" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-164 qw-rack-letter "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1243">
            N
          </p>
          <div className={"qw-layer-165 qw-rack-cell "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1244" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-166 qw-rack-letter "+cellState(12,"N",0,false)} data-node-id="I2972:106912;130:1245">
            N
          </p>
          <div className={"qw-layer-167 qw-rack-cell "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1246" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-168 qw-rack-letter "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1247">
            N
          </p>
          <div className={"qw-layer-169 qw-rack-cell "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1248" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-170 qw-rack-letter "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1249">
            N
          </p>
          <div className={"qw-layer-171 qw-rack-cell "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1250" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-172 qw-rack-letter "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1251">
            N
          </p>
          <div className={"qw-layer-173 qw-rack-cell "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1252" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-174 qw-rack-letter "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1253">
            N
          </p>
          <div className={"qw-layer-175 qw-rack-cell "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1254" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-176 qw-rack-letter "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1255">
            N
          </p>
          <div className={"qw-layer-177 qw-rack-cell "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1256" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-178 qw-rack-letter "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1257">
            N
          </p>
          <div className={"qw-layer-179 qw-rack-cell "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1258" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-180 qw-rack-letter "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1259">
            N
          </p>
          <div className={"qw-layer-181 qw-rack-cell "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1260" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-182 qw-rack-letter "+cellState(12,"N",1,false)} data-node-id="I2972:106912;130:1261">
            N
          </p>
          <div className={"qw-layer-183 qw-rack-cell "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1262" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-184 qw-rack-letter "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1263">
            N
          </p>
          <div className={"qw-layer-185 qw-rack-cell "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1264" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-186 qw-rack-letter "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1265">
            N
          </p>
          <div className={"qw-layer-187 qw-rack-cell "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1266" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-188 qw-rack-letter "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1267">
            N
          </p>
          <div className={"qw-layer-189 qw-rack-cell "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1268" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-190 qw-rack-letter "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1269">
            N
          </p>
          <div className={"qw-layer-191 qw-rack-cell "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1270" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-192 qw-rack-letter "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1271">
            N
          </p>
          <div className={"qw-layer-193 qw-rack-cell "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1272" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-194 qw-rack-letter "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1273">
            N
          </p>
          <div className={"qw-layer-195 qw-rack-cell "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1274" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-196 qw-rack-letter "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1275">
            N
          </p>
          <div className={"qw-layer-197 qw-rack-cell "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1276" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-198 qw-rack-letter "+cellState(12,"N",2,false)} data-node-id="I2972:106912;130:1277">
            N
          </p>
          <div className={"qw-layer-199 qw-rack-cell "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1278" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-200 qw-rack-letter "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1279">
            N
          </p>
          <div className={"qw-layer-201 qw-rack-cell "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1280" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-202 qw-rack-letter "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1281">
            N
          </p>
          <div className={"qw-layer-203 qw-rack-cell "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1282" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-204 qw-rack-letter "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1283">
            N
          </p>
          <div className={"qw-layer-205 qw-rack-cell "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1284" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-206 qw-rack-letter "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1285">
            N
          </p>
          <div className={"qw-layer-207 qw-rack-cell "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1286" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-208 qw-rack-letter "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1287">
            N
          </p>
          <div className={"qw-layer-209 qw-rack-cell "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1288" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-210 qw-rack-letter "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1289">
            N
          </p>
          <div className={"qw-layer-211 qw-rack-cell "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1290" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-212 qw-rack-letter "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1291">
            N
          </p>
          <div className={"qw-layer-213 qw-rack-cell "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1292" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-214 qw-rack-letter "+cellState(12,"N",3,false)} data-node-id="I2972:106912;130:1293">
            N
          </p>
          <div className={"qw-layer-215 qw-rack-cell "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1294" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-216 qw-rack-letter "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1295">
            N
          </p>
          <div className={"qw-layer-217 qw-rack-cell "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1296" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-218 qw-rack-letter "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1297">
            N
          </p>
          <div className={"qw-layer-219 qw-rack-cell "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1298" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-220 qw-rack-letter "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1299">
            N
          </p>
          <div className={"qw-layer-221 qw-rack-cell "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1300" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-222 qw-rack-letter "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1301">
            N
          </p>
          <div className={"qw-layer-223 qw-rack-cell "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1302" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-224 qw-rack-letter "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1303">
            N
          </p>
          <div className={"qw-layer-225 qw-rack-cell "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1304" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-226 qw-rack-letter "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1305">
            N
          </p>
          <div className={"qw-layer-227 qw-rack-cell "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1306" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-228 qw-rack-letter "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1307">
            N
          </p>
          <div className={"qw-layer-229 qw-rack-cell "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1308" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-230 qw-rack-letter "+cellState(12,"N",4,false)} data-node-id="I2972:106912;130:1309">
            N
          </p>
          <div className={"qw-layer-231 qw-rack-cell "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1310" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-232 qw-rack-letter "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1311">
            N
          </p>
          <div className={"qw-layer-233 qw-rack-cell "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1312" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-234 qw-rack-letter "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1313">
            N
          </p>
          <div className={"qw-layer-235 qw-rack-cell "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1314" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-236 qw-rack-letter "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1315">
            N
          </p>
          <div className={"qw-layer-237 qw-rack-cell "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1316" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-238 qw-rack-letter "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1317">
            N
          </p>
          <div className={"qw-layer-239 qw-rack-cell "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1318" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-240 qw-rack-letter "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1319">
            N
          </p>
          <div className={"qw-layer-241 qw-rack-cell "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1320" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-242 qw-rack-letter "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1321">
            N
          </p>
          <div className={"qw-layer-243 qw-rack-cell "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1322" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-244 qw-rack-letter "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1323">
            N
          </p>
          <div className={"qw-layer-245 qw-rack-cell "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1324" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-246 qw-rack-letter "+cellState(12,"N",5,false)} data-node-id="I2972:106912;130:1325">
            N
          </p>
          <div className={"qw-layer-247 qw-rack-cell "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1326" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-248 qw-rack-letter "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1327">
            N
          </p>
          <div className={"qw-layer-249 qw-rack-cell "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1328" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-250 qw-rack-letter "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1329">
            N
          </p>
          <div className={"qw-layer-251 qw-rack-cell "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1330" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-252 qw-rack-letter "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1331">
            N
          </p>
          <div className={"qw-layer-253 qw-rack-cell "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1332" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-254 qw-rack-letter "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1333">
            N
          </p>
          <div className={"qw-layer-255 qw-rack-cell "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1334" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-256 qw-rack-letter "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1335">
            N
          </p>
          <div className={"qw-layer-257 qw-rack-cell "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1336" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-258 qw-rack-letter "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1337">
            N
          </p>
          <div className={"qw-layer-259 qw-rack-cell "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1338" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-260 qw-rack-letter "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1339">
            N
          </p>
          <div className={"qw-layer-261 qw-rack-cell "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1340" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-262 qw-rack-letter "+cellState(12,"N",6,false)} data-node-id="I2972:106912;130:1341">
            N
          </p>
          <div className={"qw-layer-263 qw-rack-cell "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1342" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-264 qw-rack-letter "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1343">
            N
          </p>
          <div className={"qw-layer-265 qw-rack-cell "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1344" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-266 qw-rack-letter "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1345">
            N
          </p>
          <div className={"qw-layer-267 qw-rack-cell "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1346" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-268 qw-rack-letter "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1347">
            N
          </p>
          <div className={"qw-layer-269 qw-rack-cell "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1348" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-270 qw-rack-letter "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1349">
            N
          </p>
          <div className={"qw-layer-271 qw-rack-cell "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1350" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-272 qw-rack-letter "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1351">
            N
          </p>
          <div className={"qw-layer-273 qw-rack-cell "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1352" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-274 qw-rack-letter "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1353">
            N
          </p>
          <div className={"qw-layer-275 qw-rack-cell "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1354" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-276 qw-rack-letter "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1355">
            N
          </p>
          <div className={"qw-layer-277 qw-rack-cell "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1356" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-278 qw-rack-letter "+cellState(12,"N",7,false)} data-node-id="I2972:106912;130:1357">
            N
          </p>
          <div className={"qw-layer-279 qw-rack-cell "+cellState(12,"C",4,false)} data-node-id="I2972:106912;130:1358" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="102b1.svg" />
            </div>
          </div>
          <p className={"qw-layer-280 qw-rack-letter "+cellState(12,"C",4,false)} data-node-id="I2972:106912;130:1359">
            C
          </p>
          <div className={"qw-layer-281 qw-rack-cell "+cellState(12,"C",4,true)} data-node-id="I2972:106912;130:1360" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="e0cfc.svg" />
            </div>
          </div>
          <p className={"qw-layer-282 qw-rack-letter "+cellState(12,"C",4,true)} data-node-id="I2972:106912;130:1361">
            C
          </p>
          <div className={"qw-layer-283 qw-rack-cell "+cellState(12,"C",5,false)} data-node-id="I2972:106912;130:1362" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="102b1.svg" />
            </div>
          </div>
          <p className={"qw-layer-284 qw-rack-letter "+cellState(12,"C",5,false)} data-node-id="I2972:106912;130:1363">
            C
          </p>
          <div className={"qw-layer-285 qw-rack-cell "+cellState(12,"C",5,true)} data-node-id="I2972:106912;130:1364" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="e0cfc.svg" />
            </div>
          </div>
          <p className={"qw-layer-286 qw-rack-letter "+cellState(12,"C",5,true)} data-node-id="I2972:106912;130:1365">
            C
          </p>
          <div className={"qw-layer-287 qw-rack-cell "+cellState(12,"C",6,false)} data-node-id="I2972:106912;130:1366" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="102b1.svg" />
            </div>
          </div>
          <p className={"qw-layer-288 qw-rack-letter "+cellState(12,"C",6,false)} data-node-id="I2972:106912;130:1367">
            C
          </p>
          <div className={"qw-layer-289 qw-rack-cell "+cellState(12,"C",6,true)} data-node-id="I2972:106912;130:1368" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="e0cfc.svg" />
            </div>
          </div>
          <p className={"qw-layer-290 qw-rack-letter "+cellState(12,"C",6,true)} data-node-id="I2972:106912;130:1369">
            C
          </p>
          <div className={"qw-layer-291 qw-rack-cell "+cellState(12,"C",7,false)} data-node-id="I2972:106912;130:1370" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="102b1.svg" />
            </div>
          </div>
          <p className={"qw-layer-292 qw-rack-letter "+cellState(12,"C",7,false)} data-node-id="I2972:106912;130:1371">
            C
          </p>
          <div className={"qw-layer-293 qw-rack-cell "+cellState(12,"C",7,true)} data-node-id="I2972:106912;130:1372" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="e0cfc.svg" />
            </div>
          </div>
          <p className={"qw-layer-294 qw-rack-letter "+cellState(12,"C",7,true)} data-node-id="I2972:106912;130:1373">
            C
          </p>
        </div>
        <div className="qw-layer-295" data-node-id="I2972:106912;130:1374" data-name="Group">
          <div className="qw-layer-295" data-node-id="I2972:106912;130:1375" data-name="Group">
            <div className="qw-layer-296" data-node-id="I2972:106912;130:1376" data-name="Vector">
              <div className="qw-layer-5">
                <FigmaAsset file="a49ea.svg" />
              </div>
            </div>
            <div className="qw-layer-297" data-node-id="I2972:106912;130:1377" data-name="Vector">
              <div className="qw-layer-8">
                <FigmaAsset file="c493e.svg" />
              </div>
            </div>
            <div className="qw-layer-298" data-node-id="I2972:106912;130:1378" data-name="Vector">
              <div className="qw-layer-10">
                <FigmaAsset file="cb5e3.svg" />
              </div>
            </div>
            <div className="qw-layer-299" data-node-id="I2972:106912;130:1379" data-name="Vector">
              <div className="qw-layer-10">
                <FigmaAsset file="a4ad2.svg" />
              </div>
            </div>
            <div className="qw-layer-300" data-node-id="I2972:106912;130:1380" data-name="Vector">
              <FigmaAsset file="63312.svg" />
            </div>
            <div className="qw-layer-301" data-node-id="I2972:106912;130:1381" data-name="Vector">
              <FigmaAsset file="d96f7.svg" />
            </div>
            <div className="qw-layer-302" data-node-id="I2972:106912;130:1382" data-name="Vector">
              <div className="qw-layer-15">
                <FigmaAsset file="fcd47.svg" />
              </div>
            </div>
            <div className="qw-layer-303" data-node-id="I2972:106912;130:1383" data-name="Vector">
              <FigmaAsset file="9f5a9.svg" />
            </div>
            <div className="qw-layer-304" data-node-id="I2972:106912;130:1384" data-name="Vector">
              <div className="qw-layer-18">
                <FigmaAsset file="5d028.svg" />
              </div>
            </div>
            <div className="qw-layer-305" data-node-id="I2972:106912;130:1385" data-name="Vector">
              <FigmaAsset file="922d3.svg" />
            </div>
            <div className="qw-layer-306" data-node-id="I2972:106912;130:1386" data-name="Vector">
              <FigmaAsset file="922d3.svg" />
            </div>
            <div className="qw-layer-307" data-node-id="I2972:106912;130:1387" data-name="Vector">
              <div className="qw-layer-22">
                <FigmaAsset file="12da0.svg" />
              </div>
            </div>
            <div className="qw-layer-308" data-node-id="I2972:106912;130:1388" data-name="Vector">
              <FigmaAsset file="225a8.svg" />
            </div>
            <div className="qw-layer-309" data-node-id="I2972:106912;130:1389" data-name="Vector">
              <FigmaAsset file="65cde.svg" />
            </div>
            <div className="qw-layer-310" data-node-id="I2972:106912;130:1390" data-name="Vector">
              <FigmaAsset file="8ac93.svg" />
            </div>
            <div className="qw-layer-311" data-node-id="I2972:106912;130:1391" data-name="Vector">
              <FigmaAsset file="8bc95.svg" />
            </div>
            <div className="qw-layer-312" data-node-id="I2972:106912;130:1392" data-name="Vector">
              <FigmaAsset file="8bc95.svg" />
            </div>
            <div className="qw-layer-313" data-node-id="I2972:106912;130:1393" data-name="Vector">
              <FigmaAsset file="8bc95.svg" />
            </div>
            <div className="qw-layer-314" data-node-id="I2972:106912;130:1394" data-name="Vector">
              <FigmaAsset file="8bc95.svg" />
            </div>
            <div className="qw-layer-315" data-node-id="I2972:106912;130:1395" data-name="Vector">
              <FigmaAsset file="8bc95.svg" />
            </div>
            <div className="qw-layer-316" data-node-id="I2972:106912;130:1396" data-name="Vector">
              <FigmaAsset file="8bc95.svg" />
            </div>
            <div className="qw-layer-317" data-node-id="I2972:106912;130:1397" data-name="Vector">
              <div className="qw-layer-33">
                <FigmaAsset file="f4d90.svg" />
              </div>
            </div>
            <div className="qw-layer-318" data-node-id="I2972:106912;130:1398" data-name="Vector">
              <div className="qw-layer-22">
                <FigmaAsset file="b3fb1.svg" />
              </div>
            </div>
            <div className="qw-layer-319" data-node-id="I2972:106912;130:1399" data-name="Vector">
              <FigmaAsset file="5df92.svg" />
            </div>
            <div className="qw-layer-320" data-node-id="I2972:106912;130:1400" data-name="Vector">
              <FigmaAsset file="08d40.svg" />
            </div>
            <div className="qw-layer-321" data-node-id="I2972:106912;130:1401" data-name="Vector">
              <FigmaAsset file="4dc3a.svg" />
            </div>
            <div className="qw-layer-322" data-node-id="I2972:106912;130:1402" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-323" data-node-id="I2972:106912;130:1403" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-324" data-node-id="I2972:106912;130:1404" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-325" data-node-id="I2972:106912;130:1405" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-326" data-node-id="I2972:106912;130:1406" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-327" data-node-id="I2972:106912;130:1407" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-328" data-node-id="I2972:106912;130:1408" data-name="Vector">
              <div className="qw-layer-33">
                <FigmaAsset file="a8b1a.svg" />
              </div>
            </div>
            <div className="qw-layer-329" data-node-id="I2972:106912;130:1409" data-name="Vector">
              <div className="qw-layer-22">
                <FigmaAsset file="17286.svg" />
              </div>
            </div>
            <div className="qw-layer-330" data-node-id="I2972:106912;130:1410" data-name="Vector">
              <FigmaAsset file="d66c6.svg" />
            </div>
            <div className="qw-layer-331" data-node-id="I2972:106912;130:1411" data-name="Vector">
              <FigmaAsset file="08d40.svg" />
            </div>
            <div className="qw-layer-332" data-node-id="I2972:106912;130:1412" data-name="Vector">
              <FigmaAsset file="4dc3a.svg" />
            </div>
            <div className="qw-layer-333" data-node-id="I2972:106912;130:1413" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-334" data-node-id="I2972:106912;130:1414" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-335" data-node-id="I2972:106912;130:1415" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-336" data-node-id="I2972:106912;130:1416" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-337" data-node-id="I2972:106912;130:1417" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-338" data-node-id="I2972:106912;130:1418" data-name="Vector">
              <FigmaAsset file="4327c.svg" />
            </div>
            <div className="qw-layer-339" data-node-id="I2972:106912;130:1419" data-name="Vector">
              <div className="qw-layer-33">
                <FigmaAsset file="a8b1a.svg" />
              </div>
            </div>
            <div className="qw-layer-340" data-node-id="I2972:106912;130:1420" data-name="Vector">
              <div className="qw-layer-22">
                <FigmaAsset file="83d64.svg" />
              </div>
            </div>
            <div className="qw-layer-341" data-node-id="I2972:106912;130:1421" data-name="Vector">
              <FigmaAsset file="7d064.svg" />
            </div>
            <div className="qw-layer-342" data-node-id="I2972:106912;130:1422" data-name="Vector">
              <FigmaAsset file="ef9d0.svg" />
            </div>
            <div className="qw-layer-343" data-node-id="I2972:106912;130:1423" data-name="Vector">
              <FigmaAsset file="43649.svg" />
            </div>
            <div className="qw-layer-344" data-node-id="I2972:106912;130:1424" data-name="Vector">
              <FigmaAsset file="15ea4.svg" />
            </div>
            <div className="qw-layer-345" data-node-id="I2972:106912;130:1425" data-name="Vector">
              <FigmaAsset file="15ea4.svg" />
            </div>
            <div className="qw-layer-346" data-node-id="I2972:106912;130:1426" data-name="Vector">
              <FigmaAsset file="15ea4.svg" />
            </div>
            <div className="qw-layer-347" data-node-id="I2972:106912;130:1427" data-name="Vector">
              <FigmaAsset file="15ea4.svg" />
            </div>
            <div className="qw-layer-348" data-node-id="I2972:106912;130:1428" data-name="Vector">
              <FigmaAsset file="15ea4.svg" />
            </div>
            <div className="qw-layer-349" data-node-id="I2972:106912;130:1429" data-name="Vector">
              <FigmaAsset file="15ea4.svg" />
            </div>
            <div className="qw-layer-350" data-node-id="I2972:106912;130:1430" data-name="Vector">
              <div className="qw-layer-33">
                <FigmaAsset file="a8b1a.svg" />
              </div>
            </div>
            <p className="qw-layer-351" data-node-id="I2972:106912;130:1431">
              电源框
            </p>
            <div className="qw-layer-352" data-node-id="I2972:106912;130:1432" data-name="Vector">
              <div className="qw-layer-69">
                <FigmaAsset file="42354.svg" />
              </div>
            </div>
            <div className="qw-layer-353" data-node-id="I2972:106912;130:1433" data-name="Vector">
              <FigmaAsset file="93376.svg" />
            </div>
            <div className="qw-layer-354" data-node-id="I2972:106912;130:1434" data-name="Vector">
              <FigmaAsset file="d7f86.svg" />
            </div>
            <p className="qw-layer-355" data-node-id="I2972:106912;130:1435">
              管理刀片
            </p>
            <div className="qw-layer-356" data-node-id="I2972:106912;130:1436" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="783a7.svg" />
              </div>
            </div>
            <div className="qw-layer-357" data-node-id="I2972:106912;130:1437" data-name="Vector">
              <FigmaAsset file="638f3.svg" />
            </div>
            <div className="qw-layer-358" data-node-id="I2972:106912;130:1438" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <div className="qw-layer-359" data-node-id="I2972:106912;130:1441" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="783a7.svg" />
              </div>
            </div>
            <div className="qw-layer-360" data-node-id="I2972:106912;130:1442" data-name="Vector">
              <FigmaAsset file="638f3.svg" />
            </div>
            <div className="qw-layer-361" data-node-id="I2972:106912;130:1443" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <div className="qw-layer-362" data-node-id="I2972:106912;130:1446" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="783a7.svg" />
              </div>
            </div>
            <div className="qw-layer-363" data-node-id="I2972:106912;130:1447" data-name="Vector">
              <FigmaAsset file="638f3.svg" />
            </div>
            <div className="qw-layer-364" data-node-id="I2972:106912;130:1448" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <div className="qw-layer-365" data-node-id="I2972:106912;130:1451" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="783a7.svg" />
              </div>
            </div>
            <div className="qw-layer-366" data-node-id="I2972:106912;130:1452" data-name="Vector">
              <FigmaAsset file="d57cf.svg" />
            </div>
            <div className="qw-layer-367" data-node-id="I2972:106912;130:1453" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <div className="qw-layer-368" data-node-id="I2972:106912;130:1456" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="14a1c.svg" />
              </div>
            </div>
            <div className="qw-layer-369" data-node-id="I2972:106912;130:1457" data-name="Vector">
              <FigmaAsset file="d57cf.svg" />
            </div>
            <div className="qw-layer-370" data-node-id="I2972:106912;130:1458" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <div className="qw-layer-371" data-node-id="I2972:106912;130:1461" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="14a1c.svg" />
              </div>
            </div>
            <div className="qw-layer-372" data-node-id="I2972:106912;130:1462" data-name="Vector">
              <FigmaAsset file="d57cf.svg" />
            </div>
            <div className="qw-layer-373" data-node-id="I2972:106912;130:1463" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <div className="qw-layer-374" data-node-id="I2972:106912;130:1466" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="14a1c.svg" />
              </div>
            </div>
            <div className="qw-layer-375" data-node-id="I2972:106912;130:1467" data-name="Vector">
              <FigmaAsset file="d57cf.svg" />
            </div>
            <div className="qw-layer-376" data-node-id="I2972:106912;130:1468" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <div className="qw-layer-377" data-node-id="I2972:106912;130:1471" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="2463e.svg" />
              </div>
            </div>
            <div className="qw-layer-378" data-node-id="I2972:106912;130:1472" data-name="Vector">
              <FigmaAsset file="d57cf.svg" />
            </div>
            <div className="qw-layer-379" data-node-id="I2972:106912;130:1473" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-380" data-node-id="I2972:106912;130:1476" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="bcca1.svg" />
              </div>
            </div>
            <div className="qw-layer-381" data-node-id="I2972:106912;130:1477" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-382" data-node-id="I2972:106912;130:1478" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-383" data-node-id="I2972:106912;130:1481" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="bcca1.svg" />
              </div>
            </div>
            <div className="qw-layer-384" data-node-id="I2972:106912;130:1482" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-385" data-node-id="I2972:106912;130:1483" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-386" data-node-id="I2972:106912;130:1486" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="bcca1.svg" />
              </div>
            </div>
            <div className="qw-layer-387" data-node-id="I2972:106912;130:1487" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-388" data-node-id="I2972:106912;130:1488" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-389" data-node-id="I2972:106912;130:1491" data-name="Vector">
              <div className="qw-layer-87">
                <FigmaAsset file="bcca1.svg" />
              </div>
            </div>
            <div className="qw-layer-390" data-node-id="I2972:106912;130:1492" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-391" data-node-id="I2972:106912;130:1493" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-392" data-node-id="I2972:106912;130:1496" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="2b1c3.svg" />
              </div>
            </div>
            <div className="qw-layer-393" data-node-id="I2972:106912;130:1497" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-394" data-node-id="I2972:106912;130:1498" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-395" data-node-id="I2972:106912;130:1501" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="2b1c3.svg" />
              </div>
            </div>
            <div className="qw-layer-396" data-node-id="I2972:106912;130:1502" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-397" data-node-id="I2972:106912;130:1503" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-398" data-node-id="I2972:106912;130:1506" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="2b1c3.svg" />
              </div>
            </div>
            <div className="qw-layer-399" data-node-id="I2972:106912;130:1507" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-400" data-node-id="I2972:106912;130:1508" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-401" data-node-id="I2972:106912;130:1511" data-name="Vector">
              <div className="qw-layer-74">
                <FigmaAsset file="2b1c3.svg" />
              </div>
            </div>
            <div className="qw-layer-402" data-node-id="I2972:106912;130:1512" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-403" data-node-id="I2972:106912;130:1513" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <div className="qw-layer-404" data-node-id="I2972:106912;130:1516" data-name="Vector">
              <div className="qw-layer-124">
                <FigmaAsset file="179ac.svg" />
              </div>
            </div>
            <div className="qw-layer-405" data-node-id="I2972:106912;130:1517" data-name="Vector">
              <FigmaAsset file="d57cf.svg" />
            </div>
            <div className="qw-layer-406" data-node-id="I2972:106912;130:1518" data-name="Vector">
              <FigmaAsset file="ef9ec.svg" />
            </div>
            <p className="qw-layer-407" data-node-id="I2972:106912;130:1519">
              RoCE板
            </p>
            <div className="qw-layer-408" data-node-id="I2972:106912;130:1520" data-name="Vector">
              <div className="qw-layer-124">
                <FigmaAsset file="099cd.svg" />
              </div>
            </div>
            <div className="qw-layer-409" data-node-id="I2972:106912;130:1521" data-name="Vector">
              <FigmaAsset file="532ac.svg" />
            </div>
            <div className="qw-layer-410" data-node-id="I2972:106912;130:1522" data-name="Vector">
              <FigmaAsset file="712d1.svg" />
            </div>
            <p className="qw-layer-411" data-node-id="I2972:106912;130:1523">
              RoCE板
            </p>
          </div>
          <div className={"qw-layer-412 qw-rack-cell "+cellState(13,"C",0,false)} data-node-id="I2972:106912;130:1540" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="9a5ff.svg" />
            </div>
          </div>
          <p className={"qw-layer-413 qw-rack-letter "+cellState(13,"C",0,false)} data-node-id="I2972:106912;130:1541">
            C
          </p>
          <div className={"qw-layer-414 qw-rack-cell "+cellState(13,"C",0,true)} data-node-id="I2972:106912;130:1542" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="3be16.svg" />
            </div>
          </div>
          <p className={"qw-layer-415 qw-rack-letter "+cellState(13,"C",0,true)} data-node-id="I2972:106912;130:1543">
            C
          </p>
          <div className={"qw-layer-416 qw-rack-cell "+cellState(13,"C",1,false)} data-node-id="I2972:106912;130:1544" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="9a5ff.svg" />
            </div>
          </div>
          <p className={"qw-layer-417 qw-rack-letter "+cellState(13,"C",1,false)} data-node-id="I2972:106912;130:1545">
            C
          </p>
          <div className={"qw-layer-418 qw-rack-cell "+cellState(13,"C",1,true)} data-node-id="I2972:106912;130:1546" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="3be16.svg" />
            </div>
          </div>
          <p className={"qw-layer-419 qw-rack-letter "+cellState(13,"C",1,true)} data-node-id="I2972:106912;130:1547">
            C
          </p>
          <div className={"qw-layer-420 qw-rack-cell "+cellState(13,"C",2,false)} data-node-id="I2972:106912;130:1548" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="102b1.svg" />
            </div>
          </div>
          <p className={"qw-layer-421 qw-rack-letter "+cellState(13,"C",2,false)} data-node-id="I2972:106912;130:1549">
            C
          </p>
          <div className={"qw-layer-422 qw-rack-cell "+cellState(13,"C",2,true)} data-node-id="I2972:106912;130:1550" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="e0cfc.svg" />
            </div>
          </div>
          <p className={"qw-layer-423 qw-rack-letter "+cellState(13,"C",2,true)} data-node-id="I2972:106912;130:1551">
            C
          </p>
          <div className={"qw-layer-424 qw-rack-cell "+cellState(13,"C",3,false)} data-node-id="I2972:106912;130:1552" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="102b1.svg" />
            </div>
          </div>
          <p className={"qw-layer-425 qw-rack-letter "+cellState(13,"C",3,false)} data-node-id="I2972:106912;130:1553">
            C
          </p>
          <div className={"qw-layer-426 qw-rack-cell "+cellState(13,"C",3,true)} data-node-id="I2972:106912;130:1554" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="e0cfc.svg" />
            </div>
          </div>
          <p className={"qw-layer-427 qw-rack-letter "+cellState(13,"C",3,true)} data-node-id="I2972:106912;130:1555">
            C
          </p>
          <div className={"qw-layer-428 qw-rack-cell "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1556" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-429 qw-rack-letter "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1557">
            N
          </p>
          <div className={"qw-layer-430 qw-rack-cell "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1558" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-431 qw-rack-letter "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1559">
            N
          </p>
          <div className={"qw-layer-432 qw-rack-cell "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1560" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-433 qw-rack-letter "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1561">
            N
          </p>
          <div className={"qw-layer-434 qw-rack-cell "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1562" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-435 qw-rack-letter "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1563">
            N
          </p>
          <div className={"qw-layer-436 qw-rack-cell "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1564" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-437 qw-rack-letter "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1565">
            N
          </p>
          <div className={"qw-layer-438 qw-rack-cell "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1566" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-439 qw-rack-letter "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1567">
            N
          </p>
          <div className={"qw-layer-440 qw-rack-cell "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1568" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-441 qw-rack-letter "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1569">
            N
          </p>
          <div className={"qw-layer-442 qw-rack-cell "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1570" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-443 qw-rack-letter "+cellState(13,"N",0,false)} data-node-id="I2972:106912;130:1571">
            N
          </p>
          <div className={"qw-layer-444 qw-rack-cell "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1572" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-445 qw-rack-letter "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1573">
            N
          </p>
          <div className={"qw-layer-446 qw-rack-cell "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1574" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-447 qw-rack-letter "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1575">
            N
          </p>
          <div className={"qw-layer-448 qw-rack-cell "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1576" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-449 qw-rack-letter "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1577">
            N
          </p>
          <div className={"qw-layer-450 qw-rack-cell "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1578" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-451 qw-rack-letter "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1579">
            N
          </p>
          <div className={"qw-layer-452 qw-rack-cell "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1580" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-453 qw-rack-letter "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1581">
            N
          </p>
          <div className={"qw-layer-454 qw-rack-cell "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1582" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-455 qw-rack-letter "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1583">
            N
          </p>
          <div className={"qw-layer-456 qw-rack-cell "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1584" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-457 qw-rack-letter "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1585">
            N
          </p>
          <div className={"qw-layer-458 qw-rack-cell "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1586" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-459 qw-rack-letter "+cellState(13,"N",1,false)} data-node-id="I2972:106912;130:1587">
            N
          </p>
          <div className={"qw-layer-460 qw-rack-cell "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1588" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-461 qw-rack-letter "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1589">
            N
          </p>
          <div className={"qw-layer-462 qw-rack-cell "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1590" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-463 qw-rack-letter "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1591">
            N
          </p>
          <div className={"qw-layer-464 qw-rack-cell "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1592" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-465 qw-rack-letter "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1593">
            N
          </p>
          <div className={"qw-layer-466 qw-rack-cell "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1594" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-467 qw-rack-letter "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1595">
            N
          </p>
          <div className={"qw-layer-468 qw-rack-cell "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1596" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-469 qw-rack-letter "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1597">
            N
          </p>
          <div className={"qw-layer-470 qw-rack-cell "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1598" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-471 qw-rack-letter "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1599">
            N
          </p>
          <div className={"qw-layer-472 qw-rack-cell "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1600" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-473 qw-rack-letter "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1601">
            N
          </p>
          <div className={"qw-layer-474 qw-rack-cell "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1602" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-475 qw-rack-letter "+cellState(13,"N",2,false)} data-node-id="I2972:106912;130:1603">
            N
          </p>
          <div className={"qw-layer-476 qw-rack-cell "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1604" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-477 qw-rack-letter "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1605">
            N
          </p>
          <div className={"qw-layer-478 qw-rack-cell "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1606" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-479 qw-rack-letter "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1607">
            N
          </p>
          <div className={"qw-layer-480 qw-rack-cell "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1608" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-481 qw-rack-letter "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1609">
            N
          </p>
          <div className={"qw-layer-482 qw-rack-cell "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1610" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-483 qw-rack-letter "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1611">
            N
          </p>
          <div className={"qw-layer-484 qw-rack-cell "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1612" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-485 qw-rack-letter "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1613">
            N
          </p>
          <div className={"qw-layer-486 qw-rack-cell "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1614" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-487 qw-rack-letter "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1615">
            N
          </p>
          <div className={"qw-layer-488 qw-rack-cell "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1616" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-489 qw-rack-letter "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1617">
            N
          </p>
          <div className={"qw-layer-490 qw-rack-cell "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1618" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-491 qw-rack-letter "+cellState(13,"N",3,false)} data-node-id="I2972:106912;130:1619">
            N
          </p>
          <div className={"qw-layer-492 qw-rack-cell "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1620" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-493 qw-rack-letter "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1621">
            N
          </p>
          <div className={"qw-layer-494 qw-rack-cell "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1622" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-495 qw-rack-letter "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1623">
            N
          </p>
          <div className={"qw-layer-496 qw-rack-cell "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1624" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-497 qw-rack-letter "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1625">
            N
          </p>
          <div className={"qw-layer-498 qw-rack-cell "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1626" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-499 qw-rack-letter "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1627">
            N
          </p>
          <div className={"qw-layer-500 qw-rack-cell "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1628" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-501 qw-rack-letter "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1629">
            N
          </p>
          <div className={"qw-layer-502 qw-rack-cell "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1630" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-503 qw-rack-letter "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1631">
            N
          </p>
          <div className={"qw-layer-504 qw-rack-cell "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1632" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-505 qw-rack-letter "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1633">
            N
          </p>
          <div className={"qw-layer-506 qw-rack-cell "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1634" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-507 qw-rack-letter "+cellState(13,"N",4,false)} data-node-id="I2972:106912;130:1635">
            N
          </p>
          <div className={"qw-layer-508 qw-rack-cell "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1636" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-509 qw-rack-letter "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1637">
            N
          </p>
          <div className={"qw-layer-510 qw-rack-cell "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1638" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-511 qw-rack-letter "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1639">
            N
          </p>
          <div className={"qw-layer-512 qw-rack-cell "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1640" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-513 qw-rack-letter "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1641">
            N
          </p>
          <div className={"qw-layer-514 qw-rack-cell "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1642" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-515 qw-rack-letter "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1643">
            N
          </p>
          <div className={"qw-layer-516 qw-rack-cell "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1644" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-517 qw-rack-letter "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1645">
            N
          </p>
          <div className={"qw-layer-518 qw-rack-cell "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1646" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-519 qw-rack-letter "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1647">
            N
          </p>
          <div className={"qw-layer-520 qw-rack-cell "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1648" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-521 qw-rack-letter "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1649">
            N
          </p>
          <div className={"qw-layer-522 qw-rack-cell "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1650" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-523 qw-rack-letter "+cellState(13,"N",5,false)} data-node-id="I2972:106912;130:1651">
            N
          </p>
          <div className={"qw-layer-524 qw-rack-cell "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1652" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-525 qw-rack-letter "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1653">
            N
          </p>
          <div className={"qw-layer-526 qw-rack-cell "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1654" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-527 qw-rack-letter "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1655">
            N
          </p>
          <div className={"qw-layer-528 qw-rack-cell "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1656" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-529 qw-rack-letter "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1657">
            N
          </p>
          <div className={"qw-layer-530 qw-rack-cell "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1658" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-531 qw-rack-letter "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1659">
            N
          </p>
          <div className={"qw-layer-532 qw-rack-cell "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1660" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-533 qw-rack-letter "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1661">
            N
          </p>
          <div className={"qw-layer-534 qw-rack-cell "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1662" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-535 qw-rack-letter "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1663">
            N
          </p>
          <div className={"qw-layer-536 qw-rack-cell "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1664" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-537 qw-rack-letter "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1665">
            N
          </p>
          <div className={"qw-layer-538 qw-rack-cell "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1666" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-539 qw-rack-letter "+cellState(13,"N",6,false)} data-node-id="I2972:106912;130:1667">
            N
          </p>
          <div className={"qw-layer-540 qw-rack-cell "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1668" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="e5d7b.svg" />
            </div>
          </div>
          <p className={"qw-layer-541 qw-rack-letter "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1669">
            N
          </p>
          <div className={"qw-layer-542 qw-rack-cell "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1670" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="86bde.svg" />
            </div>
          </div>
          <p className={"qw-layer-543 qw-rack-letter "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1671">
            N
          </p>
          <div className={"qw-layer-544 qw-rack-cell "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1672" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="67b63.svg" />
            </div>
          </div>
          <p className={"qw-layer-545 qw-rack-letter "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1673">
            N
          </p>
          <div className={"qw-layer-546 qw-rack-cell "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1674" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-547 qw-rack-letter "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1675">
            N
          </p>
          <div className={"qw-layer-548 qw-rack-cell "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1676" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-549 qw-rack-letter "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1677">
            N
          </p>
          <div className={"qw-layer-550 qw-rack-cell "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1678" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-551 qw-rack-letter "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1679">
            N
          </p>
          <div className={"qw-layer-552 qw-rack-cell "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1680" data-name="Vector">
            <div className="qw-layer-150">
              <FigmaAsset file="a606e.svg" />
            </div>
          </div>
          <p className={"qw-layer-553 qw-rack-letter "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1681">
            N
          </p>
          <div className={"qw-layer-554 qw-rack-cell "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1682" data-name="Vector">
            <div className="qw-layer-153">
              <FigmaAsset file="2f03a.svg" />
            </div>
          </div>
          <p className={"qw-layer-555 qw-rack-letter "+cellState(13,"N",7,false)} data-node-id="I2972:106912;130:1683">
            N
          </p>
          <div className={"qw-layer-556 qw-rack-cell "+cellState(13,"C",4,false)} data-node-id="I2972:106912;130:1684" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="102b1.svg" />
            </div>
          </div>
          <p className={"qw-layer-557 qw-rack-letter "+cellState(13,"C",4,false)} data-node-id="I2972:106912;130:1685">
            C
          </p>
          <div className={"qw-layer-558 qw-rack-cell "+cellState(13,"C",4,true)} data-node-id="I2972:106912;130:1686" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="e0cfc.svg" />
            </div>
          </div>
          <p className={"qw-layer-559 qw-rack-letter "+cellState(13,"C",4,true)} data-node-id="I2972:106912;130:1687">
            C
          </p>
          <div className={"qw-layer-560 qw-rack-cell "+cellState(13,"C",5,false)} data-node-id="I2972:106912;130:1688" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="102b1.svg" />
            </div>
          </div>
          <p className={"qw-layer-561 qw-rack-letter "+cellState(13,"C",5,false)} data-node-id="I2972:106912;130:1689">
            C
          </p>
          <div className={"qw-layer-562 qw-rack-cell "+cellState(13,"C",5,true)} data-node-id="I2972:106912;130:1690" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="e0cfc.svg" />
            </div>
          </div>
          <p className={"qw-layer-563 qw-rack-letter "+cellState(13,"C",5,true)} data-node-id="I2972:106912;130:1691">
            C
          </p>
          <div className={"qw-layer-564 qw-rack-cell "+cellState(13,"C",6,false)} data-node-id="I2972:106912;130:1692" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="102b1.svg" />
            </div>
          </div>
          <p className={"qw-layer-565 qw-rack-letter "+cellState(13,"C",6,false)} data-node-id="I2972:106912;130:1693">
            C
          </p>
          <div className={"qw-layer-566 qw-rack-cell "+cellState(13,"C",6,true)} data-node-id="I2972:106912;130:1694" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="e0cfc.svg" />
            </div>
          </div>
          <p className={"qw-layer-567 qw-rack-letter "+cellState(13,"C",6,true)} data-node-id="I2972:106912;130:1695">
            C
          </p>
          <div className={"qw-layer-568 qw-rack-cell "+cellState(13,"C",7,false)} data-node-id="I2972:106912;130:1696" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="102b1.svg" />
            </div>
          </div>
          <p className={"qw-layer-569 qw-rack-letter "+cellState(13,"C",7,false)} data-node-id="I2972:106912;130:1697">
            C
          </p>
          <div className={"qw-layer-570 qw-rack-cell "+cellState(13,"C",7,true)} data-node-id="I2972:106912;130:1698" data-name="Vector">
            <div className="qw-layer-133">
              <FigmaAsset file="e0cfc.svg" />
            </div>
          </div>
          <p className={"qw-layer-571 qw-rack-letter "+cellState(13,"C",7,true)} data-node-id="I2972:106912;130:1699">
            C
          </p>
        </div>
      </div>
    </div>
);}

function process_inputs() {
	document.getElementById("mouseInputs_locations").innerHTML = "";
	for (var i = 0; i < mouseInputs_locations.length; i++) {
		if (i > 0) {document.getElementById("mouseInputs_locations").innerHTML += ", ";}
		document.getElementById("mouseInputs_locations").innerHTML += Names[Locations.indexOf(mouseInputs_locations[i])];
	}
	
	var peeked = false;
	for (var i = 0; i < Locations.length; i++) {
		var key = Locations[i];
		
		for (var j = 34; j > 0; j--) {
			if (i < AreaIndexes[j]) {var AreaNamesIndex = AreaIndexes.indexOf(AreaIndexes[j]);};
		}
		
		if(Check[key] != "unknown" && checkedYet[i-1] == false) {checkedYet[i - 1] = true; textBlock += "" + tempHours + "h " + tempMinutes + "m " + tempSeconds + "s " + AreaNames[AreaNamesIndex] + ": " + Names[i] + "\n"};
		if(Check[key] != "unknown") {continue;}
		hinted = false;
		if (isLowerCase(document.getElementById(key).value.charAt(0)) 
		 && isUpperCase(document.getElementById(key).value.charAt(document.getElementById(key).value.length-1))
		 && document.getElementById(key).value.length > 0) {	
			peeked = true;
			document.getElementById(key).value = document.getElementById(key).value.toLowerCase();
			console.log(document.getElementById(key).value)
		}
		else if (isUpperCase(document.getElementById(key).value.charAt(0)) 
			  && isLowerCase(document.getElementById(key).value.charAt(document.getElementById(key).value.length - 1)) 
			  && document.getElementById(key).value.length > 0) {
			
			hinted = true;
			document.getElementById(key).value = document.getElementById(key).value.toLowerCase();
		}
		if(document.getElementById(key).value == "chu") {
			if(Game.has_chus == false)
				enableChus();
				
			if(!Known.bombchus1) {Known.bombchus1 = true;}
			else if(!Known.bombchus2) {Known.bombchus2 = true;}
			else if(!Known.bombchus3) {Known.bombchus3 = true;}
			else if(!Known.bombchus4) {Known.bombchus4 = true;}
			else if(!Known.bombchus5) {Known.bombchus5 = true;}
			
			document.getElementById("text_" + Locations[i]).dispatchEvent(new Event('mousedown'));
		}
		
		for (var j = 0; j < inputs.length; j++) {
			var isSong = (songInputs.indexOf(inputs[j]) != -1 && i >= AreaIndexes[34]);
			var isItem = (itemInputs.indexOf(inputs[j]) != -1 && i < AreaIndexes[34]);
			
			if (document.getElementById(key).value == inputs[j] && (isSong || isItem)) {
				
				// don't allow inputting the same item twice if it's not a duplicate item
				if(!DuplicateItems.includes(Items2[j]) && Known[Items2[j]])
					continue;
				
				// if it is a duplicate item and all copies are already known, don't allow the input
				if(Items2[j] == "bomb_bag" && Known["bomb_bag3"]) continue;
				if(Items2[j] == "bow" && Known["bow3"]) continue;
				if(Items2[j] == "slingshot" && Known["slingshot3"]) continue;
				if(Items2[j] == "strength" && Known["strength3"]) continue;
				if(Items2[j] == "bottle" && Known["bottle3"]) continue;
				if(Items2[j] == "hookshot" && Known["hookshot2"]) continue;
				if(Items2[j] == "magic" && Known["magic2"]) continue;
				if(Items2[j] == "scale" && Known["scale2"]) continue;
				if(Items2[j] == "wallet" && Known["wallet2"]) continue;
				if(((inputs[j] == "pre" && isItem) || Items2[j] == "claim_check") && (Known["prescription"] || Known["claim_check"])) continue;
				
				if (j == 0) {document.getElementById("text_" + Locations[i]).dispatchEvent(new Event('mousedown')); continue;}
				if (j == 1) {Check[document.getElementById(key).id]="small_key"; forcedDisplay[i] = true; document.getElementById(key).value = document.getElementById(key).value.toUpperCase(); continue;}
				if (j == 2) {Check[document.getElementById(key).id]="boss_key"; forcedDisplay[i] = true; document.getElementById(key).value = document.getElementById(key).value.toUpperCase(); continue;}
				if (i > lastItem && inputNames[j] == "Prescription") {continue;}
				for (var k = 0; k <= 3; k++) {
					if (k == 0) {var duplicate = "";}
					else {var duplicate = k + "";}
					if (!Known[Items2[j] + duplicate]) {
						if (i <= lastItem) {
							Check[document.getElementById(key).id] = Items2[j] + duplicate; 
							Location[Items2[j] + duplicate] = document.getElementById(key).id;
							if (Items2[j] == "prescription" || Items2[j] == "claim_check") {document.getElementById("trade_location").innerHTML = ItemNames2[j] + " &#8594; " + AreaNames[AreaNamesIndex] + ": " + Names[i];} else if (Items2[j] == "big_poe") {document.getElementById("bottle"+duplicate+"_location").innerHTML = ItemNames2[j] + " &#8594; " + AreaNames[AreaNamesIndex] + ": " + Names[i];} else {document.getElementById(Items2[j] + duplicate + "_location").innerHTML = ItemNames2[j] + " &#8594; " + AreaNames[AreaNamesIndex] + ": " + Names[i];}
							Known[Items2[j] + duplicate] = true; 
							if (inputs[j] == "big") {Known.big_poe = true; Location.big_poe = document.getElementById(key).id;}
							if (!hinted && !peeked){
								Game[Items2[j] + duplicate] = true;
								if(inputs[j] == "big")
									Game["big_poe"] = true;
							}
							if (hinted) {Hinted[key] = true;} 
							if (hinted) {temptext2 += Names[i] + ":  " + ItemNames2[j] + "<br />";} 
							if (peeked) {peekOrHintText = "";}
							if(hintedInput == inputs[j])
								thisIsHinted = true;
							junkItem(document.getElementById(key));
							if (!Game[Items2[j] + duplicate]) {forcedDisplay[i] = true; document.getElementById(key).style.backgroundImage= ""; document.getElementById(key).value = document.getElementById(key).value.toUpperCase()}
							thisIsHinted = false;
							hintedInput = "";
							break;
						}
						else {
							Check[document.getElementById(key).id] = Items2[j];
							Location[Items2[j]] = document.getElementById(key).id; 
							Known[Items2[j]] = true; 
							if (!hinted && !peeked) {Game[Items2[j]] = true;} 
							if (hinted) {Hinted[key] = true;} 
							if (hinted || peeked) {temptext2 += Names[i] + ": " + ItemNames2[j] + "<br />";} 
							var change = "text_" + document.getElementById(key).id; 
							document.getElementById(change).innerHTML += ": " + ItemNames2[j]; 
							junkSong(document.getElementById(key));
							break;
						}
					}
				}
			}
		}
	}
}

function stone_medallion_input() {	
	var str = document.getElementById("markStones").value.substring(0,2);
		
	if (!hasChangedMedal) {
		document.getElementById("text_dung7").style.color = "yellow";
		document.getElementById("text_dung8").style.color = "yellow";
		document.getElementById("text_dung9").style.color = "yellow";
	}
	dekuPlacement = "unknown";
	dodongosPlacement = "unknown";
	jabuPlacement = "unknown";
	forestPlacement = "unknown";
	firePlacement = "unknown";
	waterPlacement = "unknown";
	spiritPlacement = "unknown";
	shadowPlacement = "unknown";
	pocketPlacement = "unknown";
		
	for (var i = 1; i<=9; i++) {
		
		Logic["dung" + i] = "unknown";
		document.getElementById("dung" + i + "_icon").src = dungIconSources[i-1];
		document.getElementById("dung" + i + "_req1").removeAttribute('src');
		document.getElementById("dung" + i + "_req2").removeAttribute('src');
		document.getElementById("dung" + i + "_req3").removeAttribute('src');
		document.getElementById("dung" + i + "_req4").removeAttribute('src');
		document.getElementById("dung" + i + "_req5").removeAttribute('src');
		document.getElementById("dung" + i + "_req1").removeAttribute('class');
		document.getElementById("dung" + i + "_req2").removeAttribute('class');
		document.getElementById("dung" + i + "_req3").removeAttribute('class');
		document.getElementById("dung" + i + "_req4").removeAttribute('class');
		document.getElementById("dung" + i + "_req5").removeAttribute('class');
		document.getElementById("dung" + i + "_text2").innerHTML ="";
		document.getElementById("dung" + i + "_text3").innerHTML ="";
		
		if (i <= 3) {document.getElementById("dung" + i + "_icon").className = "stones";}
		if (i > 3)  {document.getElementById("dung" + i + "_icon").className = "medallions";}
		
		if (str == "de") {Logic["dung" + i] = "deku"; document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "dek"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.kokiri_sword_img; dekuPlacement = "dung" + i;}
		else if (str == "do") {Logic["dung" + i]= "dodongos"; document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "dod"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.bomb_img; dodongosPlacement = "dung" + i;}
		else if (str == "ja") {Logic["dung" + i] = "jabu"; document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "jab"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req2").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.rutos_letter_img; document.getElementById("dung" + i + "_req2").src=Game.boomerang_img; jabuPlacement = "dung" + i;}
		else if (str == "fo") {Logic["dung" + i] = "forest"; document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "for"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req2").className = "requirements"; document.getElementById("dung" + i + "_req3").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.hookshot_img; document.getElementById("dung" + i + "_req2").src=Game.bow_img; document.getElementById("dung" + i + "_req3").src=Game.goron_bracelet_img; forestPlacement = "dung" + i;}
		else if (str == "fi") {Logic["dung" + i] = "fire"; document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "fir"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.hammer_img; firePlacement = "dung" + i;}
		else if (str == "wa") {Logic["dung" + i] = "water"; document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "wat"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req2").className = "requirements"; document.getElementById("dung" + i + "_req3").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.iron_boots_img; document.getElementById("dung" + i + "_text2").innerHTML ="/"; document.getElementById("dung" + i + "_req2").src=Game.golden_scale_img; document.getElementById("dung" + i + "_text3").innerHTML = "+"; document.getElementById("dung" + i + "_req3").src=Game.longshot_img; waterPlacement = "dung" + i;}
		else if (str == "sh") {Logic["dung" + i] = "shadow"; document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "sha"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req2").className = "requirements"; document.getElementById("dung" + i + "_req3").className = "requirements"; document.getElementById("dung" + i + "_req4").className = "requirements"; document.getElementById("dung" + i + "_req5").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.dins_fire_img; document.getElementById("dung" + i + "_req2").src =Game.magic_img; document.getElementById("dung" + i + "_req3").src=Game.hover_boots_img; document.getElementById("dung" + i + "_req4").src=Game.bomb_img; document.getElementById("dung" + i + "_req5").src=Game.hookshot_img; shadowPlacement = "dung" + i;}
		else if (str == "sp") {Logic["dung" + i] = "spirit"; document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "spi"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req2").className = "requirements"; document.getElementById("dung" + i + "_req3").className = "requirements"; document.getElementById("dung" + i + "_req4").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.silver_gauntlets_img; document.getElementById("dung" + i + "_req2").src=Game.mirror_shield_img; document.getElementById("dung" + i + "_req3").src=Game.bomb_img; document.getElementById("dung" + i + "_req4").src=Game.hookshot_img; spiritPlacement = "dung" + i;}
		else if (str == "fr" || str == "kk") {Logic["dung" + i] = "pocket"; document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "pok"; pocketPlacement = "dung" + i;}
		else {
			document.getElementById("dung" + i + "_icon").className = "empty"; 
		}
		
		if (i == 1) {str = document.getElementById("markStones").value.substring(2,4);} 
		else if (i == 2) {str = document.getElementById("markStones").value.substring(4,6);} 
		else if (i == 3) {str = document.getElementById("markMedallions").value.substring(0,2); if (document.getElementById("markMedallions").value.length >= 12){str = document.getElementById("markMedallions").value.substring(2,4);} }
		else if (i == 4) {str = document.getElementById("markMedallions").value.substring(2,4); if (document.getElementById("markMedallions").value.length >= 12){str = document.getElementById("markMedallions").value.substring(4,6);} }
		else if (i == 5) {str = document.getElementById("markMedallions").value.substring(4,6); if (document.getElementById("markMedallions").value.length >= 12){str = document.getElementById("markMedallions").value.substring(6,8);} }
		else if (i == 6) {str = document.getElementById("markMedallions").value.substring(6,8); if (document.getElementById("markMedallions").value.length >= 12){str = document.getElementById("markMedallions").value.substring(8,10);} }
		else if (i == 7) {str = document.getElementById("markMedallions").value.substring(8,10); if (document.getElementById("markMedallions").value.length >= 12){str = document.getElementById("markMedallions").value.substring(10,12);} }
		else if (i == 8) {str = document.getElementById("markMedallions").value.substring(10,12); if (document.getElementById("markMedallions").value.length >= 12){str = document.getElementById("markMedallions").value.substring(0,2);} }
	}
	
	if (Logic.dung7 != "unknown") {Logic.shadow_medallion = Logic.dung7; document.getElementById("text_dung7").style.color = "rgb(238, 130, 238)"; document.getElementById("dung7_icon").src = "./normal/items/shadow.png";}
	if (Logic.dung8 != "unknown") {Logic.spirit_medallion = Logic.dung8; document.getElementById("text_dung8").style.color = "rgb(255, 165, 0)"; document.getElementById("dung8_icon").src = "./normal/items/spirit.png";}
	
	for (var i = 1; i<= 9; i++) {
		if (dekuPlacement == "unknown" && Logic["dung" + i] == "unknown") {if (Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown" && Logic.dung7 != "unknown" && Logic.dung8 != "unknown" && Logic.dung9 != "unknown") {Logic["dung" + i] = "deku"; document.getElementById("dung" + i + "_icon").src = dungIconSources[i-1];} else if (Logic.dung1 != "unknown" && Logic.dung2 != "unknown" && Logic.dung3 != "unknown" && Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown") {Logic["dung" + i] = "deku"; document.getElementById("dung" + i + "_icon").src = dungIconSources[8];} document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "dek"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.kokiri_sword_img; dekuPlacement = "dung" + i;}
		else if (dodongosPlacement == "unknown" && Logic["dung" + i] == "unknown") {if (Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown" && Logic.dung7 != "unknown" && Logic.dung8 != "unknown" && Logic.dung9 != "unknown") {Logic["dung" + i] = "dodongos"; document.getElementById("dung" + i + "_icon").src = dungIconSources[i-1];} else if (Logic.dung1 != "unknown" && Logic.dung2 != "unknown" && Logic.dung3 != "unknown" && Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown") {Logic["dung" + i] = "dodongos"; document.getElementById("dung" + i + "_icon").src = dungIconSources[8];} document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "dod"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.bomb_img; dodongosPlacement = "dung" + i;}
		else if (jabuPlacement == "unknown" && Logic["dung" + i] == "unknown") {if (Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown" && Logic.dung7 != "unknown" && Logic.dung8 != "unknown" && Logic.dung9 != "unknown") {Logic["dung" + i] = "jabu"; document.getElementById("dung" + i + "_icon").src = dungIconSources[i-1];} else if (Logic.dung1 != "unknown" && Logic.dung2 != "unknown" && Logic.dung3 != "unknown" && Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown") {Logic["dung" + i] = "jabu"; document.getElementById("dung" + i + "_icon").src = dungIconSources[8];} document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "jab"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req2").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.rutos_letter_img; document.getElementById("dung" + i + "_req2").src=Game.boomerang_img; jabuPlacement = "dung" + i;}
		else if (forestPlacement == "unknown" && Logic["dung" + i] == "unknown") {if (Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown" && Logic.dung7 != "unknown" && Logic.dung8 != "unknown" && Logic.dung9 != "unknown") {Logic["dung" + i] = "forest"; document.getElementById("dung" + i + "_icon").src = dungIconSources[i-1];} else if (Logic.dung1 != "unknown" && Logic.dung2 != "unknown" && Logic.dung3 != "unknown" && Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown") {Logic["dung" + i] = "forest"; document.getElementById("dung" + i + "_icon").src = dungIconSources[8];} document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "for"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req2").className = "requirements"; document.getElementById("dung" + i + "_req3").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.hookshot_img; document.getElementById("dung" + i + "_req2").src=Game.bow_img; document.getElementById("dung" + i + "_req3").src=Game.goron_bracelet_img; forestPlacement = "dung" + i;}
		else if (firePlacement == "unknown" && Logic["dung" + i] == "unknown") {if (Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown" && Logic.dung7 != "unknown" && Logic.dung8 != "unknown" && Logic.dung9 != "unknown") {Logic["dung" + i] = "fire"; document.getElementById("dung" + i + "_icon").src = dungIconSources[i-1];} else if (Logic.dung1 != "unknown" && Logic.dung2 != "unknown" && Logic.dung3 != "unknown" && Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown") {Logic["dung" + i] = "fire"; document.getElementById("dung" + i + "_icon").src = dungIconSources[8];} document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "fir"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.hammer_img; firePlacement = "dung" + i;}
		else if (waterPlacement == "unknown" && Logic["dung" + i] == "unknown") {if (Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown" && Logic.dung7 != "unknown" && Logic.dung8 != "unknown" && Logic.dung9 != "unknown") {Logic["dung" + i] = "water"; document.getElementById("dung" + i + "_icon").src = dungIconSources[i-1];} else if (Logic.dung1 != "unknown" && Logic.dung2 != "unknown" && Logic.dung3 != "unknown" && Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown") {Logic["dung" + i] = "water"; document.getElementById("dung" + i + "_icon").src = dungIconSources[8];} document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "wat"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req2").className = "requirements"; document.getElementById("dung" + i + "_req3").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.iron_boots_img; document.getElementById("dung" + i + "_text2").innerHTML ="/"; document.getElementById("dung" + i + "_req2").src=Game.golden_scale_img; document.getElementById("dung" + i + "_text3").innerHTML = "+"; document.getElementById("dung" + i + "_req3").src=Game.longshot_img; waterPlacement = "dung" + i;}
		else if (shadowPlacement == "unknown" && Logic["dung" + i] == "unknown") {if (Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown" && Logic.dung7 != "unknown" && Logic.dung8 != "unknown" && Logic.dung9 != "unknown") {Logic["dung" + i] = "shadow"; document.getElementById("dung" + i + "_icon").src = dungIconSources[i-1];} else if (Logic.dung1 != "unknown" && Logic.dung2 != "unknown" && Logic.dung3 != "unknown" && Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown") {Logic["dung" + i] = "shadow"; document.getElementById("dung" + i + "_icon").src = dungIconSources[8];} document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "sha"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req2").className = "requirements"; document.getElementById("dung" + i + "_req3").className = "requirements"; document.getElementById("dung" + i + "_req4").className = "requirements"; document.getElementById("dung" + i + "_req5").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.dins_fire_img; document.getElementById("dung" + i + "_req2").src =Game.magic_img; document.getElementById("dung" + i + "_req3").src=Game.hover_boots_img; document.getElementById("dung" + i + "_req4").src=Game.bomb_img; document.getElementById("dung" + i + "_req5").src=Game.hookshot_img; shadowPlacement = "dung" + i;}
		else if (spiritPlacement == "unknown" && Logic["dung" + i] == "unknown") {if (Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown" && Logic.dung7 != "unknown" && Logic.dung8 != "unknown" && Logic.dung9 != "unknown") {Logic["dung" + i] = "spirit"; document.getElementById("dung" + i + "_icon").src = dungIconSources[i-1];} else if (Logic.dung1 != "unknown" && Logic.dung2 != "unknown" && Logic.dung3 != "unknown" && Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown") {Logic["dung" + i] = "spirit"; document.getElementById("dung" + i + "_icon").src = dungIconSources[8];} document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "spi"; document.getElementById("dung" + i + "_req1").className = "requirements"; document.getElementById("dung" + i + "_req2").className = "requirements"; document.getElementById("dung" + i + "_req3").className = "requirements"; document.getElementById("dung" + i + "_req4").className = "requirements"; document.getElementById("dung" + i + "_req1").src=Game.silver_gauntlets_img; document.getElementById("dung" + i + "_req2").src=Game.mirror_shield_img; document.getElementById("dung" + i + "_req3").src=Game.bomb_img; document.getElementById("dung" + i + "_req4").src=Game.hookshot_img; spiritPlacement = "dung" + i;}
		else if (pocketPlacement == "unknown" && Logic["dung" + i] == "unknown") {if (Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown" && Logic.dung7 != "unknown" && Logic.dung8 != "unknown" && Logic.dung9 != "unknown") {Logic["dung" + i] = "pocket"; document.getElementById("dung" + i + "_icon").src = dungIconSources[i-1];} else if (Logic.dung1 != "unknown" && Logic.dung2 != "unknown" && Logic.dung3 != "unknown" && Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown") {Logic["dung" + i] = "pocket"; document.getElementById("dung" + i + "_icon").src = dungIconSources[8];} document.getElementById("text_dung" + i).className="dung" + i; document.getElementById("text_dung" + i).innerHTML = "pok"; pocketPlacement = "dung" + i;}
		if (i <= 3 && Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown" && Logic.dung7 != "unknown" && Logic.dung8 != "unknown" && Logic.dung9 != "unknown") {document.getElementById("dung" + i + "_icon").className = "stones"; }
		if (i > 3 && Logic.dung1 != "unknown" && Logic.dung2 != "unknown" && Logic.dung3 != "unknown" && Logic.dung4 != "unknown" && Logic.dung5 != "unknown" && Logic.dung6 != "unknown") {document.getElementById("dung" + i + "_icon").className = "medallions"; }
	}
	
	Logic.emerald = Logic.dung1;
	Logic.ruby = Logic.dung2;
	Logic.sapphire = Logic.dung3;
	Logic.forest_medallion_location = Logic.dung4;
	Logic.fire_medallion_location = Logic.dung5;
	Logic.water_medallion_location = Logic.dung6;
	Logic.generic1 = Logic.dung7;
	Logic.generic2 = Logic.dung8;
	Logic.generic3 = Logic.dung9;		
}

function spawn_inputs() {
	if (document.getElementById("markChildLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("DMC by Goron City")].toLowerCase()) {Spawn.child_lower_dmc = true;} else {Spawn.child_lower_dmc = false;}
	if (document.getElementById("markChildLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("DMC fountain")].toLowerCase()) {Spawn.child_lower_dmc = true; Spawn.child_lower_dmc_fairy = true;} else {Spawn.child_lower_dmc_fairy = false;}
	if (document.getElementById("markChildLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("DMC by trail")].toLowerCase()) {Spawn.child_upper_dmc = true;} else {Spawn.child_upper_dmc = false;}
	if (document.getElementById("markChildLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("trail fairy")].toLowerCase()) {Spawn.child_upper_dmc = true; Spawn.child_dmt_fairy = true;} else {Spawn.child_dmt_fairy = false;}
	if (document.getElementById("markChildLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("trail fairy(ool)")].toLowerCase()) {Spawn.child_upper_dmc = true; Spawn.child_dmt_fairy = true; Spawn.child_dmt_fairy_ool = true;} else {Spawn.child_dmt_fairy_ool = false;}
	if (document.getElementById("markChildLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("fortress")].toLowerCase()) {Spawn.child_gv_gf = true;} else {Spawn.child_gv_gf = false;}
	if (document.getElementById("markChildLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("dins fairy")].toLowerCase()) {Spawn.child_hyrule_fairy = true;} else {Spawn.child_hyrule_fairy = false;}
	if (document.getElementById("markChildLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("domain")].toLowerCase()) {Spawn.child_zd = true;} else {Spawn.child_zd = false;}
	if (document.getElementById("markChildLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("river")].toLowerCase()) {Spawn.child_zr = true;} else {Spawn.child_zr = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("DMC by Goron City")].toLowerCase()) {Spawn.adult_lower_dmc = true;} else {Spawn.adult_lower_dmc = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("DMC fountain")].toLowerCase()) {Spawn.adult_lower_dmc_fairy = true; Spawn.adult_lower_dmc = true;} else {Spawn.adult_lower_dmc_fairy = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("DMC by trail")].toLowerCase()) {Spawn.adult_upper_dmc = true;} else {Spawn.adult_upper_dmc = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("trail fairy")].toLowerCase()) {Spawn.adult_upper_dmc = true; Spawn.adult_dmt_fairy = true;} else {Spawn.adult_dmt_fairy = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("trail fairy(ool)")].toLowerCase()) {Spawn.adult_upper_dmc = true; Spawn.adult_dmt_fairy = true; Spawn.adult_dmt_fairy_ool = true;} else {Spawn.adult_dmt_fairy_ool = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("fortress")].toLowerCase()) {Spawn.adult_gf = true;} else {Spawn.adult_gf = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("goron shop")].toLowerCase()) {Spawn.adult_gc_shop = true;} else {Spawn.adult_gc_shop = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("nocturne")].toLowerCase()) {Spawn.adult_nocturne = true;} else {Spawn.adult_nocturne = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("fishing")].toLowerCase()) {Spawn.adult_fishing = true;} else {Spawn.adult_fishing = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("sfm")].toLowerCase()) {Spawn.adult_meadow = true;} else {Spawn.adult_meadow = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("domain")].toLowerCase()) {Spawn.adult_zd = true;} else {Spawn.adult_zd = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("domain shop")].toLowerCase()) {Spawn.adult_zd_shop = true; Spawn.adult_zd = true;} else {Spawn.adult_zd_shop = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("ogc fairy")].toLowerCase()) {Spawn.adult_ogc = true;} else {Spawn.adult_ogc = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("ogc fairy(ool)")].toLowerCase()) {Spawn.adult_ogc_ool = true; Spawn.adult_ogc = true;} else {Spawn.adult_ogc_ool = false;}
	if (document.getElementById("markAdultLocation").value.toLowerCase() == spawnInputs[spawnNames.indexOf("kak rooftop")].toLowerCase()) {Spawn.adult_kak_roof = true;} else {Spawn.adult_kak_roof = false;}
}

function linSoClick() {
	var str = event.target.src.split("/");
	str = str[str.length-1];
	str = str.substring(0,str.length-4);
	if (str.endsWith("forest") || str.endsWith("fire") || str.endsWith("water")){return;}
	if (str.endsWith("hookshot") && Game.hookshot)  {Game.hookshot2 = true;}
	else if (str.endsWith("longshot")) {Game.hookshot1 = false; Game.hookshot2 = false;}
	else if (str.endsWith("hookshot")) {Game.hookshot1 = true;}
	else if (str.endsWith("bracelet") && Game.goron_bracelet)  {if (!Game.strength1) {Game.strength1 = true;} else if (!Game.strength2) {Game.strength2 = true;} else{Game.strength3 = true;}}
	else if (str.endsWith("silver_gauntlets")) {Game.strength1 = true; Game.strength2 = true; Game.strength3 = true;}
	else if (str.endsWith("golden_gauntlets")) {Game.strength1 = false; Game.strength2 = false; Game.strength3 = false;}
	else if (str.endsWith("bracelet")) {Game.strength1 = true;}
	else if (str.endsWith("silver_scale") && Game.scale1) {Game.scale2 = true;}
	else if (str.endsWith("golden_scale")) {Game.scale1 = false; Game.scale2 = false;}
	else if (str.endsWith("silver_scale")) {Game.scale1 = true;}
	else if (str.endsWith("magic") && Game.magic) {Game.magic2 = true;}
	else if (str.endsWith("magic_2")) {Game.magic1 = false; Game.magic2 = false;}
	else if (str.endsWith("adults_wallet") && Game.adults_wallet) {Game.wallet2 = true;}
	else if (str.endsWith("giants_wallet") && Game.wallet3) {Game.wallet1 = false; Game.wallet2 = false; Game.wallet3 = false; }
	else if (str.endsWith("giants_wallet") && Game.giants_wallet) {Game.wallet3 = true;}
	else if (str.endsWith("adults_wallet")) {Game.wallet1 = true;}
	else if (str.endsWith("magic")) {Game.magic1 = true;}
	else if (str.endsWith("bomb")) {if (Game.bomb_bag1) {Game.bomb_bag1 = false; Game.bomb_bag2 = false; Game.bomb_bag3 = false;} else {Game.bomb_bag1 = true;}}
	else if (str.endsWith("claim_check") && Game.claim_check) {Game.claim_check = false;}
	else if (str.endsWith("chicken1") && Game.chicken1) {Game.chicken1 = false; Game.blue_chicken = true;}
	else if (str.endsWith("blue_chicken") && Game.blue_chicken) {Game.blue_chicken = false; Game.odd_mushroom = true;}
	else if (str.endsWith("eyeball_frog") && Game.eyeball_frog) {Game.eyeball_frog = false; Game.eyedrops = true;}
	else if (str.endsWith("broken_sword") && Game.broken_sword) {Game.broken_sword = false; Game.prescription = true;}
	else if (str.endsWith("eyedrops") && Game.eyedrops) {Game.eyedrops = false; Game.claim_check = true;}
	else if (str.endsWith("odd_mushroom") && Game.odd_mushroom) {Game.odd_mushroom = false; Game.antidote = true;}
	else if (str.endsWith("antidote") && Game.antidote) {Game.antidote = false; Game.poachers_saw = true;}
	else if (str.endsWith("egg1") && Game.egg1) {Game.egg1 = false; Game.chicken1 = true;}
	else if (str.endsWith("poachers_saw") && Game.poachers_saw) {Game.poachers_saw = false; Game.broken_sword = true;}
	else if (str.endsWith("prescription") && Game.prescription) {Game.prescription = false; Game.eyeball_frog = true;}
	else if (str.endsWith("egg1")) {Game.egg1 = true;}
	else if (str.endsWith("mask_of_truth") && Game.mask_of_truth) {Game.mask_of_truth = false;}
	else if (str.endsWith("gerudo_mask") && Game.gerudo_mask) {Game.gerudo_mask = false; Game.mask_of_truth = true;}
	else if (str.endsWith("zora_mask") && Game.zora_mask) {Game.zora_mask = false; Game.gerudo_mask = true;}
	else if (str.endsWith("goron_mask") && Game.goron_mask) {Game.goron_mask = false; Game.zora_mask = true;}
	else if (str.endsWith("bunny_hood") && Game.bunny_hood) {Game.bunny_hood = false; Game.goron_mask = true;}
	else if (str.endsWith("spooky_mask") && Game.spooky_mask) {Game.spooky_mask = false; Game.bunny_hood = true;}
	else if (str.endsWith("skull_mask") && Game.skull_mask) {Game.skull_mask = false; Game.spooky_mask = true;}
	else if (str.endsWith("keaton_mask") && Game.keaton_mask) {Game.keaton_mask = false; Game.skull_mask = true;}
	else if (str.endsWith("zeldas_letter") && Game.zeldas_letter) {Game.zeldas_letter = false; Game.keaton_mask = true;}
	else if (str.endsWith("chicken2") && Game.chicken2) {Game.chicken2 = false; Game.zeldas_letter = true;}
	else if (str.endsWith("egg2") && Game.egg2) {Game.egg2 = false; Game.chicken2 = true;}
	else if (str.endsWith("egg2")) {Game.egg2 = true;}
	else if (event.target.style.filter == "none") {Game[str] = false; Game[str+1] = false;}
	else {Game[str] = true; Game[str+1] = true;}
	Update();
}

function junk() {
	var type = event.button;
	var str = event.target.id;
	str = str.substring('text_'.length);
	var temp = Locations.indexOf(str);
	
	if(type == 0 && !event.altKey && Check[str] == "unknown") {
		if(str.includes("forest_") && Game.forest_checks_remaining != 0) {Game.forest_checks_remaining -=1;}
		else if(str.includes("fire_") && Game.fire_checks_remaining != 0 && str != "fire_grave") {Game.fire_checks_remaining -=1;}
		else if(str.includes("water_") && Game.water_checks_remaining != 0) {Game.water_checks_remaining -=1;}
		else if(str.includes("spirit_") && Game.spirit_checks_remaining != 0) {Game.spirit_checks_remaining -=1;}
		else if(str.includes("shadow_") && Game.shadow_checks_remaining != 0) {Game.shadow_checks_remaining -=1;}
		else if(str.includes("ganons_") && Game.ganons_checks_remaining != 0) {Game.ganons_checks_remaining -=1;}
		else if(str.includes("gtg_") && Game.gtg_checks_remaining != 0) {Game.gtg_checks_remaining -=1;}
		else if(str.includes("well_") && Game.well_checks_remaining != 0) {Game.well_checks_remaining -=1;}
		else if(temp < AreaIndexes[26]){}
		else {return;}
		Check[str]="junk";
	}
	
	else if(type == 1 || (type == 0 && event.altKey) || thisIsABossKey || document.getElementById(str).value == "BK") {
		if(str.includes("forest_") && !Game.forest_boss_key) {Game.forest_boss_key = true; Location.forest_boss_key = str;}
		else if(str.includes("fire_") && !Game.fire_boss_key) {Game.fire_boss_key = true; Location.fire_boss_key = str;}
		else if(str.includes("water_") && !Game.water_boss_key) {Game.water_boss_key = true; Location.water_boss_key = str;}
		else if(str.includes("spirit_") && !Game.spirit_boss_key) {Game.spirit_boss_key = true; Location.spirit_boss_key = str;}
		else if(str.includes("shadow_") && !Game.shadow_boss_key) {Game.shadow_boss_key = true; Location.shadow_boss_key = str;}
		else if(str.includes("ganons_") && !Game.ganons_boss_key) {Game.ganons_boss_key = true; Location.ganons_boss_key = str;}
		else {
			if(str.startsWith("shop_")) {if (Shop_Logic[str] == "giants_wallet") {Shop_Logic[str] = "accessible"} else if (Shop_Logic[str] == "accessible") {Shop_Logic[str] = "adults_wallet"} else {Shop_Logic[str] = "giants_wallet"}}	
			return;
		}
		if (thisIsABossKey) {temptext2 += Names[temp] + ":  Boss Key" + "<br />";}
		Check[str]="boss_key";
	}
	
	else if ((type == 2 && !event.altKey) || thisIsAKey || document.getElementById(str).value == "SK") {
		if(str.includes("forest_") && Game.current_forest_keys < 5) {Game.current_forest_keys +=1;}
		else if(str.includes("fire_") && Game.current_fire_keys < 8) {Game.current_fire_keys +=1;}
		else if(str.includes("water_") && Game.current_water_keys < 6) {Game.current_water_keys +=1;}
		else if(str.includes("spirit_") && Game.current_spirit_keys < 5) {Game.current_spirit_keys +=1;}
		else if(str.includes("shadow_") && Game.current_shadow_keys < 5) {Game.current_shadow_keys +=1;}
		else if(str.includes("gtg_") && Game.current_gtg_keys < 9) {Game.current_gtg_keys +=1;}
		else if(str.includes("well_") && Game.current_well_keys < 3) {Game.current_well_keys +=1;}
		else if(str.includes("ganons_") && Game.current_ganons_keys < 2) {Game.current_ganons_keys +=1;}
		else {
		if (event.target.style.color == "magenta") {event.target.style.color = "green";}
		else {event.target.style.color = "magenta"; event.target.style.opacity = "1"}
		return;
		}
		Check[str]="small_key";
		if (thisIsAKey) {temptext2 += Names[temp] + ":  Small Key" + "<br />";}
	}
	else if (type == 2 && event.altKey) {
		if (event.target.style.color == "magenta") {event.target.style.color = "green";}
		else {event.target.style.color = "magenta"; event.target.style.opacity = "1"}
		return;
	}
	else if (Check[str] == "unknown") {
		Check[str]="junk";
	}
	
	document.getElementById(str).style.display = "none";
	document.getElementById("text_" + str).style.display = "none";
	document.getElementById("br_" + str).style.display = "none";
	
	if (forcedDisplay[temp]) {forcedDisplay[temp] = false; Game[Check[str]] = true; Update(); }

	if (Check[str] != "junk") {midUpdate();}
	lastCheck.push(str);
	Update();
	
	if(!thisIsHinted) {
		
		for(var j = 0; j < AreaIndexes.length; j++) {
			if(Locations.indexOf(str) < AreaIndexes[j])
				break;
		}
	
		for (var i = Locations.indexOf(str) + 1; i < Locations.length; i++) {
			if(i >= AreaIndexes[j])
				break;
			
			if (document.getElementById(Locations[i]).style.display != "none") {
				document.getElementById(Locations[i]).focus(); //why doesn't this work
				break;
			}
		}
	}
}	

function junkUltra() {
	var x = event.target;
	
	if (x.id == "forest") {var temp = 26; Logic.forced_forest_keys = 5 - Game.current_forest_keys; Game.current_forest_keys = 5; if (Game.forest_boss_key == false) {Logic.forced_forest_boss_key = true; Game.forest_boss_key = true;}}
	if (x.id == "fire") {var temp = 27; Logic.forced_fire_keys = 8 - Game.current_fire_keys; Game.current_fire_keys = 8; if (Game.fire_boss_key == false) {Logic.forced_fire_boss_key = true; Game.fire_boss_key = true;}}
	if (x.id == "water") {var temp = 28; Logic.forced_water_keys = 6 - Game.current_water_keys; Game.current_water_keys = 6; if (Game.water_boss_key == false) {Logic.forced_water_boss_key = true; Game.water_boss_key = true;}}
	if (x.id == "spirit") {var temp = 29; Logic.forced_spirit_keys = 5 - Game.current_spirit_keys; Game.current_spirit_keys = 5; if (Game.spirit_boss_key == false) {Logic.forced_spirit_boss_key = true; Game.spirit_boss_key = true;}}
	if (x.id == "shadow") {var temp = 30; Logic.forced_shadow_keys = 5 - Game.current_shadow_keys; Game.current_shadow_keys = 5; if (Game.shadow_boss_key == false) {Logic.forced_shadow_boss_key = true; Game.shadow_boss_key = true;}}
	if (x.id == "ganons") {var temp = 31; Logic.forced_ganons_keys = 2 - Game.current_ganons_keys; Game.current_ganons_keys = 2; if (Game.ganons_boss_key == false) {Logic.ganons_boss_key = true; Game.ganons_boss_key = true;}}
	if (x.id == "gtg") {var temp = 32; Logic.forced_gtg_keys = 5 - Game.current_gtg_keys; Game.current_gtg_keys = 9;}
	if (x.id == "well") {var temp = 33; Logic.forced_well_keys = 5 - Game.current_well_keys; Game.current_well_keys = 3;}
	for (var i = AreaIndexes[temp]; i < AreaIndexes[temp + 1]; i++){
		if (Check[Locations[i]] == "unknown") {Check[Locations[i]] = "ultra";}
		document.getElementById(Locations[i]).style.display = "none";
		document.getElementById("text_" + Locations[i]).style.display = "none";
		document.getElementById("br_" + Locations[i]).style.display = "none";
	}
	midUpdate();
	slowUpdate();
	Update();
}

function junkItem(x) {
	var str2 = x.id;
	var temp = true;
	if (str2.includes('shadow_') || str2.includes('spirit_') || str2.includes('forest_') || str2.includes('fire_') || str2.includes('water_') || str2.includes('gtg_') || str2.includes('well_')|| str2.includes('ganons_')) {
		temp = false;
		if(str2.includes('forest_') && Game.forest_checks_remaining != 0) {Game.forest_checks_remaining -= 1; temp = true;}
		if(str2.includes('fire_') && Game.fire_checks_remaining != 0) {Game.fire_checks_remaining -= 1; temp = true;}
		if(str2.includes('water_') && Game.water_checks_remaining != 0) {Game.water_checks_remaining -= 1; temp = true;}
		if(str2.includes('shadow_') && Game.shadow_checks_remaining != 0) {Game.shadow_checks_remaining -= 1; temp = true;}
		if(str2.includes('spirit_') && Game.spirit_checks_remaining != 0) {Game.spirit_checks_remaining -= 1; temp = true;}
		if(str2.includes('ganons_') && Game.ganons_checks_remaining != 0) {Game.ganons_checks_remaining -= 1; temp = true;}
		if(str2.includes('gtg_') && Game.gtg_checks_remaining != 0) {Game.gtg_checks_remaining -= 1; temp = true;}
		if(str2.includes('well_') && Game.well_checks_remaining != 0) {Game.well_checks_remaining -= 1; temp = true;}
	}
	if (!temp) {return;}
	
	document.getElementById(str2).style.display = "none";
	document.getElementById("text_" + str2).style.display = "none";
	document.getElementById("br_" + str2).style.display = "none";
	
	lastCheck.push(str2);
	midUpdate();
	
	if(!thisIsHinted) {
		
		for(var j = 0; j < AreaIndexes.length; j++) {
			if(Locations.indexOf(str2) < AreaIndexes[j])
				break;
		}
	
		for (var i = Locations.indexOf(str2) + 1; i < Locations.length; i++) {
			if(i >= AreaIndexes[j])
				break;
			
			if (document.getElementById(Locations[i]).style.display != "none") {
				document.getElementById(Locations[i]).focus();
				break;
			}
		}
	}
}

function junkSong(x) {
	var str2 = x.id;
	document.getElementById(str2).style.display = "none";
	
	document.getElementById(str2).value = "";
	
	lastCheck.push(str2);
	Update();
}

function check_circle_info() {
	document.getElementById("forest").innerHTML = "" + Game.forest_checks_remaining;
	document.getElementById("fire").innerHTML = "" + Game.fire_checks_remaining;
	document.getElementById("water").innerHTML = "" + Game.water_checks_remaining;
	document.getElementById("spirit").innerHTML = "" + Game.spirit_checks_remaining;
	document.getElementById("shadow").innerHTML = "" + Game.shadow_checks_remaining;
	document.getElementById("ganons").innerHTML = "" + Game.ganons_checks_remaining;
	document.getElementById("gtg").innerHTML = "" + Game.gtg_checks_remaining;
	document.getElementById("well").innerHTML = "" + Game.well_checks_remaining;
	
	document.getElementById("forestSKs").innerHTML = "" + (5 - Game.current_forest_keys);
	document.getElementById("fireSKs").innerHTML = "" + (8 - Game.current_fire_keys);
	document.getElementById("waterSKs").innerHTML = "" + (6 - Game.current_water_keys);
	document.getElementById("spiritSKs").innerHTML = "" + (5 - Game.current_spirit_keys);
	document.getElementById("shadowSKs").innerHTML = "" + (5 - Game.current_shadow_keys);
	document.getElementById("ganonsSKs").innerHTML = "" + (2 - Game.current_ganons_keys);
	document.getElementById("gtgSKs").innerHTML = "" + (9 - Game.current_gtg_keys);
	document.getElementById("wellSKs").innerHTML = "" + (3 - Game.current_well_keys);
	
	if (Game.forest_boss_key) {document.getElementById("forestBKs").innerHTML = 0;} else {document.getElementById("forestBKs").innerHTML = 1;}
	if (Game.fire_boss_key) {document.getElementById("fireBKs").innerHTML = 0;} else {document.getElementById("fireBKs").innerHTML = 1;}
	if (Game.water_boss_key) {document.getElementById("waterBKs").innerHTML = 0;} else {document.getElementById("waterBKs").innerHTML = 1;}
	if (Game.spirit_boss_key) {document.getElementById("spiritBKs").innerHTML = 0;} else {document.getElementById("spiritBKs").innerHTML = 1;}
	if (Game.shadow_boss_key) {document.getElementById("shadowBKs").innerHTML = 0;} else {document.getElementById("shadowBKs").innerHTML = 1;}
	
	document.getElementById("forestSKs").title = "";
	document.getElementById("forestBKs").title = "";
	for(i = AreaIndexes[26]; i < AreaIndexes[27]; i++) {
		if(Check[Locations[i]] == "small_key")
			document.getElementById("forestSKs").title += Names[i] + "\n";
		if(Check[Locations[i]] == "boss_key")
			document.getElementById("forestBKs").title += Names[i] + "\n";
	}
	
	document.getElementById("fireSKs").title = "";
	document.getElementById("fireBKs").title = "";
	for(i = AreaIndexes[27]; i < AreaIndexes[28]; i++) {
		if(Check[Locations[i]] == "small_key")
			document.getElementById("fireSKs").title += Names[i] + "\n";
		if(Check[Locations[i]] == "boss_key")
			document.getElementById("fireBKs").title += Names[i] + "\n";
	}
	
	document.getElementById("waterSKs").title = "";
	document.getElementById("waterBKs").title = "";
	for(i = AreaIndexes[28]; i < AreaIndexes[29]; i++) {
		if(Check[Locations[i]] == "small_key")
			document.getElementById("waterSKs").title += Names[i] + "\n";
		if(Check[Locations[i]] == "boss_key")
			document.getElementById("waterBKs").title += Names[i] + "\n";
	}
	
	document.getElementById("spiritSKs").title = "";
	document.getElementById("spiritBKs").title = "";
	for(i = AreaIndexes[29]; i < AreaIndexes[30]; i++) {
		if(Check[Locations[i]] == "small_key")
			document.getElementById("spiritSKs").title += Names[i] + "\n";
		if(Check[Locations[i]] == "boss_key")
			document.getElementById("spiritBKs").title += Names[i] + "\n";
	}
	
	document.getElementById("shadowSKs").title = "";
	document.getElementById("shadowBKs").title = "";
	for(i = AreaIndexes[30]; i < AreaIndexes[31]; i++) {
		if(Check[Locations[i]] == "small_key")
			document.getElementById("shadowSKs").title += Names[i] + "\n";
		if(Check[Locations[i]] == "boss_key")
			document.getElementById("shadowBKs").title += Names[i] + "\n";
	}
	
	document.getElementById("ganonsSKs").title = "";
	for(i = AreaIndexes[31]; i < AreaIndexes[32]; i++)
		if(Check[Locations[i]] == "small_key")
			document.getElementById("ganonsSKs").title += Names[i] + "\n";
	
	document.getElementById("gtgSKs").title = "";
	for(i = AreaIndexes[32]; i < AreaIndexes[33]; i++)
		if(Check[Locations[i]] == "small_key")
			document.getElementById("gtgSKs").title += Names[i] + "\n";
	
	document.getElementById("wellSKs").title = "";
	for(i = AreaIndexes[33]; i < AreaIndexes[34]; i++)
		if(Check[Locations[i]] == "small_key")
			document.getElementById("wellSKs").title += Names[i] + "\n";
}

function handleAreaBreaks() {
	var tempUnique = 0;
	for (var i = 0; i < Locations.length; i++) {
		if ((i >= AreaIndexes[10] && i < AreaIndexes[11]) || (i >= AreaIndexes[17] && i < AreaIndexes[18])) {continue;}
		if (document.getElementById(Locations[i]).style.display == "none") {tempUnique += 1;} 
		if (i == AreaIndexes[1]-1) {if (tempUnique == AreaIndexes[1] - AreaIndexes[0]) {document.getElementById("kokiri_break").style.display = "none";} else {document.getElementById("kokiri_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[2]-1) {if (tempUnique == AreaIndexes[2] - AreaIndexes[1]) {document.getElementById("ranch_break").style.display = "none";} else {document.getElementById("ranch_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[3]-1) {if (tempUnique == AreaIndexes[3] - AreaIndexes[2]) {document.getElementById("field_break").style.display = "none";} else {document.getElementById("field_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[4]-1) {if (tempUnique == AreaIndexes[4] - AreaIndexes[3]) {document.getElementById("valley_break").style.display = "none";} else {document.getElementById("valley_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[5]-1) {if (tempUnique == AreaIndexes[5] - AreaIndexes[4]) {document.getElementById("hylia_break").style.display = "none";} else {document.getElementById("hylia_break").style.display == "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[6]-1) {if (tempUnique == AreaIndexes[6] - AreaIndexes[5]) {document.getElementById("market_break").style.display = "none";} else {document.getElementById("market_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[7]-1) {if (tempUnique == AreaIndexes[7] - AreaIndexes[6]) {document.getElementById("hyrule_castle_break").style.display = "none";} else {document.getElementById("hyrule_castle_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[8]-1) {if (tempUnique == AreaIndexes[8] - AreaIndexes[7]) {document.getElementById("ogc_break").style.display = "none";} else {document.getElementById("ogc_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[9]-1) {if (tempUnique == AreaIndexes[9] - AreaIndexes[8]) {document.getElementById("tot_break").style.display = "none";} else {document.getElementById("tot_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[10]-1) {if (tempUnique == AreaIndexes[10] - AreaIndexes[9]) {document.getElementById("fountain_break").style.display = "none";} else {document.getElementById("fountain_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[12]-1) {if (tempUnique == AreaIndexes[12] - AreaIndexes[11]) {document.getElementById("deku_break").style.display = "none";} else {document.getElementById("deku_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[13]-1) {if (tempUnique == AreaIndexes[13] - AreaIndexes[12]) {document.getElementById("lost_woods_break").style.display = "none";} else {document.getElementById("lost_woods_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[14]-1) {if (tempUnique == AreaIndexes[14] - AreaIndexes[13]) {document.getElementById("sfm_break").style.display = "none";} else {document.getElementById("sfm_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[15]-1) {if (tempUnique == AreaIndexes[15] - AreaIndexes[14]) {document.getElementById("goron_break").style.display = "none";} else {document.getElementById("goron_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[16]-1) {if (tempUnique == AreaIndexes[16] - AreaIndexes[15]) {document.getElementById("dodongos_break").style.display = "none";} else {document.getElementById("dodongos_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[17]-1) {if (tempUnique == AreaIndexes[17] - AreaIndexes[16]) {document.getElementById("dmt_break").style.display = "none";} else {document.getElementById("dmt_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[19]-1) {if (tempUnique == AreaIndexes[19] - AreaIndexes[18]) {document.getElementById("kakariko_break").style.display = "none";} else {document.getElementById("kakariko_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[20]-1) {if (tempUnique == AreaIndexes[20] - AreaIndexes[19]) {document.getElementById("graveyard_break").style.display = "none";} else {document.getElementById("graveyard_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[21]-1) {if (tempUnique == AreaIndexes[21] - AreaIndexes[20]) {document.getElementById("river_break").style.display = "none";} else {document.getElementById("river_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[22]-1) {if (tempUnique == AreaIndexes[22] - AreaIndexes[21]) {document.getElementById("domain_break").style.display = "none";} else {document.getElementById("domain_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[23]-1) {if (tempUnique == AreaIndexes[23] - AreaIndexes[22]) {document.getElementById("colossus_break").style.display = "none";} else {document.getElementById("colossus_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[24]-1) {if (tempUnique == AreaIndexes[24] - AreaIndexes[23]) {document.getElementById("wasteland_break").style.display = "none";} else {document.getElementById("wasteland_break").style.display = "inline-block";} tempUnique = 0;}
		if (i == AreaIndexes[25]-1) {if (tempUnique == AreaIndexes[25] - AreaIndexes[24]) {document.getElementById("fortress_break").style.display = "none";} else {document.getElementById("fortress_break").style.display = "inline-block";} tempUnique = 0;}
	}
}

function handleItemHighlights() {
	if (Game.kokiri_sword) {if(document.getElementById(dekuPlacement +"_req1") != null) {document.getElementById(dekuPlacement +"_req1").style.opacity =1; }}
	if (Game.bomb_bag) {if(document.getElementById(dodongosPlacement +"_req1") != null) {document.getElementById(dodongosPlacement +"_req1").style.opacity =1; } if(document.getElementById(shadowPlacement +"_req4") != null) {document.getElementById(shadowPlacement +"_req4").style.opacity =1; } if(document.getElementById(spiritPlacement +"_req3") != null) {document.getElementById(spiritPlacement +"_req3").style.opacity =1; }}
	if (Game.magic) {document.getElementById("gan_req1").style.opacity=1; if(document.getElementById(shadowPlacement +"_req2") != null) {document.getElementById(shadowPlacement +"_req2").style.opacity =1; }}
	if (Game.light_arrows) {document.getElementById("gan_req2").style.opacity=1;}
	if (Game.bow) {document.getElementById("gan_req3").style.opacity=1; if(document.getElementById(forestPlacement +"_req2") != null) {document.getElementById(forestPlacement +"_req2").style.opacity =1; }}
	if (Game.hookshot) {if(document.getElementById(forestPlacement +"_req1") != null) {document.getElementById(forestPlacement +"_req1").style.opacity =1; } if(document.getElementById(shadowPlacement +"_req5") != null) {document.getElementById(shadowPlacement +"_req5").style.opacity =1; } if(document.getElementById(spiritPlacement +"_req4") != null) {document.getElementById(spiritPlacement +"_req4").style.opacity =1; }}
	if (Game.goron_bracelet) {if(document.getElementById(forestPlacement +"_req3") != null) {document.getElementById(forestPlacement +"_req3").style.opacity =1; }}
	if (Game.hammer) {if(document.getElementById(firePlacement +"_req1") != null) {document.getElementById(firePlacement +"_req1").style.opacity =1; }}
	if (Game.rutos_letter) {if(document.getElementById(jabuPlacement +"_req1") != null) {document.getElementById(jabuPlacement +"_req1").style.opacity =1; }}
	if (Game.boomerang) {if(document.getElementById(jabuPlacement +"_req2") != null) {document.getElementById(jabuPlacement +"_req2").style.opacity =1; }}
	if (Game.iron_boots) {if(document.getElementById(waterPlacement +"_req1") != null) {document.getElementById(waterPlacement +"_req1").style.opacity =1; }}
	if (Game.golden_scale) {if(document.getElementById(waterPlacement +"_req2") != null) {document.getElementById(waterPlacement +"_req2").style.opacity =1; }}
	if (Game.longshot) {if(document.getElementById(waterPlacement +"_req3") != null) {document.getElementById(waterPlacement +"_req3").style.opacity =1; }}
	if (Game.silver_gauntlets) {if(document.getElementById(spiritPlacement +"_req1") != null) {document.getElementById(spiritPlacement +"_req1").style.opacity =1; }}
	if (Game.mirror_shield) {if(document.getElementById(spiritPlacement +"_req2") != null) {document.getElementById(spiritPlacement +"_req2").style.opacity =1; }}
	if (Game.dins_fire) {if(document.getElementById(shadowPlacement +"_req1") != null) {document.getElementById(shadowPlacement +"_req1").style.opacity =1; }}
	if (Game.hover_boots) {if(document.getElementById(shadowPlacement +"_req3") != null) {document.getElementById(shadowPlacement +"_req3").style.opacity =1; }}
	
	if (!Game.kokiri_sword) {if(document.getElementById(dekuPlacement +"_req1") != null) {document.getElementById(dekuPlacement +"_req1").style.opacity =.2; }}
	if (!Game.bomb_bag) {if(document.getElementById(dodongosPlacement +"_req1") != null) {document.getElementById(dodongosPlacement +"_req1").style.opacity =.2; } if(document.getElementById(shadowPlacement +"_req4") != null) {document.getElementById(shadowPlacement +"_req4").style.opacity =.2; } if(document.getElementById(spiritPlacement +"_req3") != null) {document.getElementById(spiritPlacement +"_req3").style.opacity =.2; }}
	if (!Game.magic) {document.getElementById("gan_req1").style.opacity = .2; if(document.getElementById(shadowPlacement +"_req2") != null) {document.getElementById(shadowPlacement +"_req2").style.opacity =.2; }}
	if (!Game.light_arrows) {document.getElementById("gan_req2").style.opacity = .2;}
	if (!Game.bow) {document.getElementById("gan_req3").style.opacity = .2; if(document.getElementById(forestPlacement +"_req2") != null) {document.getElementById(forestPlacement +"_req2").style.opacity =.2; }}
	if (!Game.hookshot) {if(document.getElementById(forestPlacement +"_req1") != null) {document.getElementById(forestPlacement +"_req1").style.opacity =.2; } if(document.getElementById(shadowPlacement +"_req5") != null) {document.getElementById(shadowPlacement +"_req5").style.opacity =.2; } if(document.getElementById(spiritPlacement +"_req4") != null) {document.getElementById(spiritPlacement +"_req4").style.opacity =.2; }}
	if (!Game.goron_bracelet) {if(document.getElementById(forestPlacement +"_req3") != null) {document.getElementById(forestPlacement +"_req3").style.opacity =.2; }}
	if (!Game.hammer) {if(document.getElementById(firePlacement +"_req1") != null) {document.getElementById(firePlacement +"_req1").style.opacity =.2; }}
	if (!Game.rutos_letter) {if(document.getElementById(jabuPlacement +"_req1") != null) {document.getElementById(jabuPlacement +"_req1").style.opacity =.2; }}
	if (!Game.boomerang) {if(document.getElementById(jabuPlacement +"_req2") != null) {document.getElementById(jabuPlacement +"_req2").style.opacity =.2; }}
	if (!Game.iron_boots) {if(document.getElementById(waterPlacement +"_req1") != null) {document.getElementById(waterPlacement +"_req1").style.opacity =.2; }}
	if (!Game.golden_scale) {if(document.getElementById(waterPlacement +"_req2") != null) {document.getElementById(waterPlacement +"_req2").style.opacity =.2; }}
	if (!Game.longshot) {if(document.getElementById(waterPlacement +"_req3") != null) {document.getElementById(waterPlacement +"_req3").style.opacity =.2; }}
	if (!Game.silver_gauntlets) {if(document.getElementById(spiritPlacement +"_req1") != null) {document.getElementById(spiritPlacement +"_req1").style.opacity =.2; }}
	if (!Game.mirror_shield) {if(document.getElementById(spiritPlacement +"_req2") != null) {document.getElementById(spiritPlacement +"_req2").style.opacity =.2; }}
	if (!Game.dins_fire) {if(document.getElementById(shadowPlacement +"_req1") != null) {document.getElementById(shadowPlacement +"_req1").style.opacity =.2; }}
	if (!Game.hover_boots) {if(document.getElementById(shadowPlacement +"_req3") != null) {document.getElementById(shadowPlacement +"_req3").style.opacity =.2; }}
	
	if (Game.lullaby) {document.getElementById("lullabyimg").style.opacity =1;} else {document.getElementById("lullabyimg").style.opacity =.2;}
	if (Game.eponas) {document.getElementById("eponasimg").style.opacity =1;} else {document.getElementById("eponasimg").style.opacity =.2;}
	if (Game.sarias) {document.getElementById("sariasimg").style.opacity =1;} else {document.getElementById("sariasimg").style.opacity =.2;}
	if (Game.suns) {document.getElementById("sunsimg").style.opacity =1;} else {document.getElementById("sunsimg").style.opacity =.2;}
	if (Game.time) {document.getElementById("sotimg").style.opacity =1;} else {document.getElementById("sotimg").style.opacity =.2;}
	if (Game.storms) {document.getElementById("sosimg").style.opacity =1;} else {document.getElementById("sosimg").style.opacity =.2;}
	if (Game.minuet) {document.getElementById("minuetimg").style.opacity =1;} else {document.getElementById("minuetimg").style.opacity =.2;}
	if (Game.bolero) {document.getElementById("boleroimg").style.opacity =1;} else {document.getElementById("boleroimg").style.opacity =.2;}
	if (Game.serenade) {document.getElementById("serenadeimg").style.opacity =1;} else {document.getElementById("serenadeimg").style.opacity =.2;}
	if (Game.requiem) {document.getElementById("requiemimg").style.opacity =1;} else {document.getElementById("requiemimg").style.opacity =.2;}
	if (Game.nocturne) {document.getElementById("nocturneimg").style.opacity =1;} else {document.getElementById("nocturneimg").style.opacity =.2;}
	if (Game.prelude) {document.getElementById("preludeimg").style.opacity =1;} else {document.getElementById("preludeimg").style.opacity =.2;}
	
	if (Game.bottle || Logic.bottle) {document.getElementById("bottleimg").style.opacity =1;} else {document.getElementById("bottleimg").style.opacity =.2;}
	if (Game.farores_wind) {document.getElementById("faroresimg").style.opacity =1;} else {document.getElementById("faroresimg").style.opacity =.2;}
	if (Game.fire_arrows) {document.getElementById("firearrowsimg").style.opacity =1;} else {document.getElementById("firearrowsimg").style.opacity =.2;}
	if (Game.silver_scale) {document.getElementById("silverscaleimg").style.opacity =1;} else {document.getElementById("silverscaleimg").style.opacity =.2;}
	if (Game.lens) {document.getElementById("lensimg").style.opacity =1;} else {document.getElementById("lensimg").style.opacity =.2;}
	if (Game.golden_gauntlets) {document.getElementById("goldengauntletsimg").style.opacity =1;} else {document.getElementById("goldengauntletsimg").style.opacity =.2;}
	if (Game.slingshot) {document.getElementById("slingshotimg").style.opacity =1;} else {document.getElementById("slingshotimg").style.opacity =.2;}
}

function handleDungeonHighlights() {
	if (Game.forest) {document.getElementById("dung4_icon").style.opacity=1; document.getElementById("text_dung4").style.opacity = .2;} else{document.getElementById("dung4_icon").style.opacity=.2; document.getElementById("text_dung4").style.opacity = 1;}
	if (Game.fire) {document.getElementById("dung5_icon").style.opacity=1; document.getElementById("text_dung5").style.opacity = .2;} else{document.getElementById("dung5_icon").style.opacity=.2; document.getElementById("text_dung5").style.opacity = 1;}
	if (Game.water) {document.getElementById("dung6_icon").style.opacity=1; document.getElementById("text_dung6").style.opacity = .2;} else{document.getElementById("dung6_icon").style.opacity=.2; document.getElementById("text_dung6").style.opacity = 1;}
	if (Game.gen1) {document.getElementById("dung7_icon").style.opacity=1; document.getElementById("text_dung7").style.opacity = .2;} else{document.getElementById("dung7_icon").style.opacity=.2; document.getElementById("text_dung7").style.opacity = 1;}
	if (Game.gen2) {document.getElementById("dung8_icon").style.opacity=1; document.getElementById("text_dung8").style.opacity = .2;} else{document.getElementById("dung8_icon").style.opacity=.2; document.getElementById("text_dung8").style.opacity = 1;}
	if (Game.gen3) {document.getElementById("dung9_icon").style.opacity=1; document.getElementById("text_dung9").style.opacity = .2;} else{document.getElementById("dung9_icon").style.opacity=.2; document.getElementById("text_dung9").style.opacity = 1;}
	if (Game.emerald) {document.getElementById("dung1_icon").style.opacity=1; document.getElementById("text_dung1").style.opacity = .2;} else{document.getElementById("dung1_icon").style.opacity=.2; document.getElementById("text_dung1").style.opacity = 1;}
	if (Game.ruby) {document.getElementById("dung2_icon").style.opacity=1; document.getElementById("text_dung2").style.opacity = .2;} else{document.getElementById("dung2_icon").style.opacity=.2; document.getElementById("text_dung2").style.opacity = 1;}
	if (Game.sapphire) {document.getElementById("dung3_icon").style.opacity=1; document.getElementById("text_dung3").style.opacity = .2;} else{document.getElementById("dung3_icon").style.opacity=.2; document.getElementById("text_dung3").style.opacity = 1;}

	if (Check.deku_queen_gohma != "unknown") {if (document.getElementById("text_" + dekuPlacement) != null) {document.getElementById(dekuPlacement + "_icon").style.opacity=1; document.getElementById("text_" + dekuPlacement).style.opacity=.2}}
	if (Check.dodongos_king_dodongo != "unknown") {if (document.getElementById("text_" + dodongosPlacement) != null) {document.getElementById(dodongosPlacement + "_icon").style.opacity=1; document.getElementById("text_" + dodongosPlacement).style.opacity=.2}}
	if (Check.jabu_barinade != "unknown") {if (document.getElementById("text_" + jabuPlacement) != null) {document.getElementById(jabuPlacement + "_icon").style.opacity=1; document.getElementById("text_" + jabuPlacement).style.opacity=.2}}
	if (Check.forest_phantomGanon != "unknown") {if (document.getElementById("text_" + forestPlacement) != null) {document.getElementById(forestPlacement + "_icon").style.opacity=1; document.getElementById("text_" + forestPlacement).style.opacity=.2}}
	if (Check.fire_volvagia != "unknown") {if (document.getElementById("text_" + firePlacement) != null) {document.getElementById(firePlacement + "_icon").style.opacity=1; document.getElementById("text_" + firePlacement).style.opacity=.2}}
	if (Check.water_morpha != "unknown") {if (document.getElementById("text_" + waterPlacement) != null) {document.getElementById(waterPlacement + "_icon").style.opacity=1; document.getElementById("text_" + waterPlacement).style.opacity=.2}}
	if (Check.spirit_twinrova != "unknown") {if (document.getElementById("text_" + spiritPlacement) != null) {document.getElementById(spiritPlacement + "_icon").style.opacity=1; document.getElementById("text_" + spiritPlacement).style.opacity=.2}}
	if (Check.shadow_bongo != "unknown") {if (document.getElementById("text_" + shadowPlacement) != null) {document.getElementById(shadowPlacement + "_icon").style.opacity=1; document.getElementById("text_" + shadowPlacement).style.opacity=.2}}
	if (document.getElementById("text_" + pocketPlacement) != null) {document.getElementById(pocketPlacement + "_icon").style.opacity=1; document.getElementById("text_" + pocketPlacement).style.opacity=.2}
}

function checkGanons() {
	if (Game.magic1 && Game.light_arrows && Game.bow1 && Game.ganons_checks_remaining > 0) {
		document.getElementById("ganons").click();
	}
}

function setInLogicMaxForDungeons() {
	if (Game.forest_checks_remaining >=0 && (Game.forest_checks_remaining < Game.forest_logically_accessible)) {Game.logically_accessible -= (Game.forest_logically_accessible - Game.forest_checks_remaining);}
	if (Game.fire_checks_remaining >=0 && (Game.fire_checks_remaining < Game.fire_logically_accessible)) {Game.logically_accessible -= (Game.fire_logically_accessible - Game.fire_checks_remaining);}
	if (Game.water_checks_remaining >=0 && (Game.water_checks_remaining < Game.water_logically_accessible)) {Game.logically_accessible -= (Game.water_logically_accessible - Game.water_checks_remaining);}
	if (Game.spirit_checks_remaining >=0 && (Game.spirit_checks_remaining < Game.spirit_logically_accessible)) {Game.logically_accessible -= (Game.spirit_logically_accessible - Game.spirit_checks_remaining);}
	if (Game.shadow_checks_remaining >=0 && (Game.shadow_checks_remaining < Game.shadow_logically_accessible)) {Game.logically_accessible -= (Game.shadow_logically_accessible - Game.shadow_checks_remaining);}
	if (Game.gtg_checks_remaining >=0 && (Game.gtg_checks_remaining < Game.gtg_logically_accessible)) {Game.logically_accessible -= (Game.gtg_logically_accessible - Game.gtg_checks_remaining);}
	if (Game.well_checks_remaining >=0 && (Game.well_checks_remaining < Game.well_logically_accessible)) {Game.logically_accessible -= (Game.well_logically_accessible - Game.well_checks_remaining);}
	if (Game.ganons_checks_remaining >=0 && (Game.ganons_checks_remaining < Game.ganons_logically_accessible)) {Game.logically_accessible -= (Game.ganons_logically_accessible - Game.ganons_checks_remaining);}
}
function toggleLinsoGoMode() {
	if (linsoGoMode) {linsoGoMode = false; document.getElementById("linso54").src = "circus-tent_1f3aa.png"; document.getElementById("linsoLight").style.opacity = 0; if (!circus) {document.getElementById("linso54").style.opacity = 0;}}
	else {linsoGoMode = true; document.getElementById("linso54").src = "./normal/gomode.png"; document.getElementById("linsoLight").style.opacity = 1; document.getElementById("linso54").style.opacity = 1;}
	}

function refreshLinSo() {
	if (linso) {
		document.getElementById("linsoColumn").style.display = "inline-block";
		for (var i = 0; i <= 11; i++) {
			if (Check[Locations[lastItem + i+1]] != "unknown") {document.getElementById("linsoC" + soliLinsoSongOrderConvert[i]).style.opacity = 1;} else {document.getElementById("linsoC" + soliLinsoSongOrderConvert[i]).style.opacity = 0;}
		}
		var temp = 0;
		for (var i = 1; i <= 11; i++) {
			for (var j = 1; j <= 6; j++) {
				if (i == 10 && j >= 4) {
					document.getElementById("linso" + i + j).innerHTML = document.getElementById("text_dung" + (j-3)).innerHTML.toUpperCase();
					continue;
				}
				if (i == 11) {
					document.getElementById("linso" + i + j).innerHTML = document.getElementById("text_dung" + (3 + j)).innerHTML.toUpperCase();
					continue;
				}
				if (i > 9) {continue;}
				if (linsoOrder[temp] == "" || linsoOrder[temp] == "circus") {temp += 1; continue;}
				if (linsoOrder[temp] == "" || linsoOrder[temp] == "skull_counter") {temp += 1; continue;}
				if (linsoOrder[temp] == "hookshot") {if (Game.hookshot && !Game.longshot)  {document.getElementById("linso" + i + j).src = Game.hookshot_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;} else if (Game.longshot){document.getElementById("linso" + i + j).src = Game.longshot_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;} else {document.getElementById("linso" + i + j).src = Game.hookshot_img; document.getElementById("linso" + i + j).style.filter = "grayscale(100%)"; document.getElementById("linso" + i + j).style.opacity = .2;} }
				else if (linsoOrder[temp] == "silver_scale") {if (Game.silver_scale && !Game.golden_scale)  {document.getElementById("linso" + i + j).src = Game.silver_scale_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;} else if (Game.golden_scale){document.getElementById("linso" + i + j).src = Game.golden_scale_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;} else {document.getElementById("linso" + i + j).src = Game.silver_scale_img; document.getElementById("linso" + i + j).style.filter = "grayscale(100%)"; document.getElementById("linso" + i + j).style.opacity = .2;}}
				else if (linsoOrder[temp] == "adults_wallet") {if (Game.wallet3) {document.getElementById("linso103").style.opacity = 1;} else{document.getElementById("linso103").style.opacity = 0;} if (Game.giants_wallet)  { document.getElementById("linso" + i + j).src = Game.wallet2_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;} else if (Game.adults_wallet){document.getElementById("linso" + i + j).src = Game.wallet1_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;} else {document.getElementById("linso" + i + j).src = Game.wallet1_img; document.getElementById("linso" + i + j).style.filter = "grayscale(100%)"; document.getElementById("linso" + i + j).style.opacity = .2;}}
				else if (linsoOrder[temp] == "goron_bracelet") {if (Game.golden_gauntlets)  {document.getElementById("linso" + i + j).src = Game.golden_gauntlets_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;} else if (Game.silver_gauntlets){document.getElementById("linso" + i + j).src = Game.silver_gauntlets_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;} else if (Game.goron_bracelet){document.getElementById("linso" + i + j).src = Game.goron_bracelet_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;} else {document.getElementById("linso" + i + j).src = Game.goron_bracelet_img; document.getElementById("linso" + i + j).style.filter = "grayscale(100%)"; document.getElementById("linso" + i + j).style.opacity = .2;}}
				else if (linsoOrder[temp] == "bomb") {if (Game.bomb_bag) {document.getElementById("linso" + i + j).src = Game.bomb_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;} else {document.getElementById("linso" + i + j).src = Game.bomb_img; document.getElementById("linso" + i + j).style.filter = "grayscale(100%)"; document.getElementById("linso" + i + j).style.opacity = .2;}}
				else if (linsoOrder[temp] == "magic") {if (Game.double_magic)  {document.getElementById("linso" + i + j).src = Game.magic_2_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;} else if (Game.magic){document.getElementById("linso" + i + j).src = Game.magic_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;} else {document.getElementById("linso" + i + j).src = Game.magic_img; document.getElementById("linso" + i + j).style.filter = "grayscale(100%)"; document.getElementById("linso" + i + j).style.opacity = .2;}}
				else if (linsoOrder[temp] == "egg1" && Game.claim_check) {document.getElementById("linso" + i + j).src = Game.claim_check_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg1" && Game.eyedrops) {document.getElementById("linso" + i + j).src = Game.eyedrops_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg1" && Game.eyeball_frog) {document.getElementById("linso" + i + j).src = Game.eyeball_frog_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg1" && Game.prescription) {document.getElementById("linso" + i + j).src = Game.prescription_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg1" && Game.broken_sword) {document.getElementById("linso" + i + j).src = Game.broken_sword_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg1" && Game.poachers_saw) {document.getElementById("linso" + i + j).src = Game.poachers_saw_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg1" && Game.antidote) {document.getElementById("linso" + i + j).src = Game.antidote_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg1" && Game.odd_mushroom) {document.getElementById("linso" + i + j).src = Game.odd_mushroom_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg1" && Game.blue_chicken) {document.getElementById("linso" + i + j).src = Game.blue_chicken_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg1" && Game.chicken1) {document.getElementById("linso" + i + j).src = Game.chicken1_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg1" && Game.egg1) {document.getElementById("linso" + i + j).src = Game.egg1_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg1") {document.getElementById("linso" + i + j).src = Game.egg1_img; document.getElementById("linso" + i + j).style.filter = "grayscale(100%)"; document.getElementById("linso" + i + j).style.opacity = .2;}
				else if (linsoOrder[temp] == "egg2" && Game.mask_of_truth) {document.getElementById("linso" + i + j).src = Game.mask_of_truth_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg2" && Game.gerudo_mask) {document.getElementById("linso" + i + j).src = Game.gerudo_mask_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg2" && Game.zora_mask) {document.getElementById("linso" + i + j).src = Game.zora_mask_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg2" && Game.goron_mask) {document.getElementById("linso" + i + j).src = Game.goron_mask_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg2" && Game.bunny_hood) {document.getElementById("linso" + i + j).src = Game.bunny_hood_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg2" && Game.spooky_mask) {document.getElementById("linso" + i + j).src = Game.spooky_mask_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg2" && Game.skull_mask) {document.getElementById("linso" + i + j).src = Game.skull_mask_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg2" && Game.keaton_mask) {document.getElementById("linso" + i + j).src = Game.keaton_mask_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg2" && Game.zeldas_letter) {document.getElementById("linso" + i + j).src = Game.zeldas_letter_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg2" && Game.chicken2) {document.getElementById("linso" + i + j).src = Game.chicken2_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg2" && Game.egg2) {document.getElementById("linso" + i + j).src = Game.egg2_img; document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else if (linsoOrder[temp] == "egg2") {document.getElementById("linso" + i + j).src = Game.egg2_img; document.getElementById("linso" + i + j).style.filter = "grayscale(100%)"; document.getElementById("linso" + i + j).style.opacity = .2;}
				else if (Game[linsoOrder[temp]] || (Game[linsoOrder[temp] + 1])) {document.getElementById("linso" + i + j).style.filter = "none"; document.getElementById("linso" + i + j).style.opacity = 1;}
				else {document.getElementById("linso" + i + j).style.filter = "grayscale(100%)"; document.getElementById("linso" + i + j).style.opacity = .2;}
				temp += 1;
			}
		}
		temp = 0;
		for (var i = 1; i <= 12; i++) {
			if (Game[linsoOrder2[temp]]) {document.getElementById("linsoS" + i).style.filter = "none"; document.getElementById("linsoS" + i).style.opacity = 1;}
				else {document.getElementById("linsoS" + i).style.filter = "grayscale(100%)"; document.getElementById("linsoS" + i).style.opacity = .2;}
				temp += 1;
		}
	}
	else {document.getElementById("linsoColumn").style.display = "none";}
}
function updateInputs() {
	for (var i = 0; i < inputs.length; i++) {
		inputs[i] = document.getElementById(inputNames[i]).value;
		localStorage.setItem(inputNames[i], inputs[i]);
	}
	for (var i = 0; i < spawnInputs.length; i++) {
		spawnInputs[i] = document.getElementById(spawnNames[i]).value;
		localStorage.setItem(spawnNames[i], spawnInputs[i]);
	}
}
function update_logic_info() {
	if (document.getElementById("presets").value == "LESS_PROGRESSION") {Rules.kzSkip = true; document.getElementById("bosskeys").value = "REMOVE"; document.getElementById("shuffleOcarinas").value = "OFF"; document.getElementById("ganonsBridge").value = "2_MEDALS"; document.getElementById("closedDeku").value = "CLOSED"; document.getElementById("ganonBKSetting").value = "NONE"; document.getElementById("csmc").value = "OFF"; document.getElementById("shopSanity").value = "OFF"; document.getElementById("scrubSanity").value = "OFF"; document.getElementById("skullSanity").value = "OFF"; document.getElementById("hints_type").value = "WOTH"; document.getElementById("woth_input5").style.display = "inline-block"; document.getElementById("barren_input3").style.display = "inline-block";}
	if (document.getElementById("presets").value == "S3") {Rules.kzSkip = false;  document.getElementById("bosskeys").value = "DUNGEON_ONLY"; document.getElementById("shuffleOcarinas").value = "OFF"; document.getElementById("ganonsBridge").value = "ALL_MED"; document.getElementById("closedDeku").value = "OPEN"; document.getElementById("ganonBKSetting").value = "NONE"; document.getElementById("csmc").value = "OFF"; document.getElementById("shopSanity").value = "OFF"; document.getElementById("scrubSanity").value = "OFF"; document.getElementById("skullSanity").value = "OFF"; document.getElementById("hints_type").value = "WOTH"; document.getElementById("woth_input5").style.display = "inline-block"; document.getElementById("barren_input3").style.display = "inline-block";}
	if (document.getElementById("presets").value == "SGL") {Rules.kzSkip = false;  document.getElementById("bosskeys").value = "DUNGEON_ONLY"; document.getElementById("shuffleOcarinas").value = "OFF"; document.getElementById("ganonsBridge").value = "3_STONES"; document.getElementById("closedDeku").value = "OPEN"; document.getElementById("ganonBKSetting").value = "LACS"; document.getElementById("csmc").value = "OFF"; document.getElementById("shopSanity").value = "OFF"; document.getElementById("scrubSanity").value = "OFF"; document.getElementById("skullSanity").value = "OFF"; document.getElementById("hints_type").value = "WOTH"; document.getElementById("woth_input5").style.display = "inline-block"; document.getElementById("barren_input3").style.display = "inline-block";}
	if (document.getElementById("presets").value == "S4") {Rules.kzSkip = false;  document.getElementById("bosskeys").value = "DUNGEON_ONLY"; document.getElementById("shuffleOcarinas").value = "OFF"; document.getElementById("ganonsBridge").value = "2_MEDALS"; document.getElementById("closedDeku").value = "CLOSED"; document.getElementById("ganonBKSetting").value = "LACS"; document.getElementById("csmc").value = "OFF"; document.getElementById("shopSanity").value = "OFF"; document.getElementById("scrubSanity").value = "OFF"; document.getElementById("skullSanity").value = "OFF"; document.getElementById("hints_type").value = "WOTH"; document.getElementById("woth_input5").style.display = "none"; document.getElementById("barren_input3").style.display = "none";}
	if (document.getElementById("presets").value == "WEEKLY") {Rules.kzSkip = true; document.getElementById("bosskeys").value = "DUNGEON_ONLY"; document.getElementById("shuffleOcarinas").value = "OFF"; document.getElementById("ganonsBridge").value = "4_MEDALS"; document.getElementById("closedDeku").value = "CLOSED"; document.getElementById("ganonBKSetting").value = "LACS"; document.getElementById("csmc").value = "OFF"; document.getElementById("shopSanity").value = "OFF"; document.getElementById("scrubSanity").value = "OFF"; document.getElementById("skullSanity").value = "OFF"; document.getElementById("hints_type").value = "WOTH"; document.getElementById("woth_input5").style.display = "none"; document.getElementById("barren_input3").style.display = "none";}
	if (document.getElementById("presets").value == "S5") {Rules.kzSkip = true;  document.getElementById("bosskeys").value = "DUNGEON_ONLY"; document.getElementById("shuffleOcarinas").value = "OFF"; document.getElementById("ganonsBridge").value = "ALL_MED"; document.getElementById("closedDeku").value = "CLOSED"; document.getElementById("ganonBKSetting").value = "NONE"; document.getElementById("csmc").value = "ON"; document.getElementById("shopSanity").value = "OFF"; document.getElementById("scrubSanity").value = "OFF"; document.getElementById("skullSanity").value = "OFF"; document.getElementById("hints_type").value = "PATH"; document.getElementById("woth_input5").style.display = "inline"; document.getElementById("barren_input3").style.display = "inline";}
	
	
	
	if(document.getElementById("hints_type").value == "PATH") {document.getElementById("path_boss1").style.display = "inline"; document.getElementById("path_boss2").style.display = "inline"; document.getElementById("path_boss3").style.display = "inline"; document.getElementById("path_boss4").style.display = "inline"; document.getElementById("path_boss5").style.display = "inline"; document.getElementById("path_arrow1").style.display = "inline"; document.getElementById("path_arrow2").style.display = "inline"; document.getElementById("path_arrow3").style.display = "inline"; document.getElementById("path_arrow4").style.display = "inline"; document.getElementById("path_arrow5").style.display = "inline";}
	else {document.getElementById("path_boss1").style.display = "none"; document.getElementById("path_boss2").style.display = "none"; document.getElementById("path_boss3").style.display = "none"; document.getElementById("path_boss4").style.display = "none"; document.getElementById("path_boss5").style.display = "none"; document.getElementById("path_arrow1").style.display = "none"; document.getElementById("path_arrow2").style.display = "none"; document.getElementById("path_arrow3").style.display = "none"; document.getElementById("path_arrow4").style.display = "none"; document.getElementById("path_arrow5").style.display = "none";}
		
	if (document.getElementById("presets").value == "LESS_PROGRESSION") {document.getElementById("triforcePic").style.display = "inline-block"; document.getElementById("pieceDungeons").style.display = "inline-block"; document.getElementById("pieceDungeons").value = "dojafofiwaspsh";}
	else {document.getElementById("triforcePic").style.display = "none"; document.getElementById("pieceDungeons").style.display = "none";}
	
	if (document.getElementById("bosskeys").value == "REMOVE") {Game.forest_boss_key = true; Game.fire_boss_key = true; Game.water_boss_key = true; Game.spirit_boss_key = true; Game.shadow_boss_key = true; removeBKFlag = true;}
	else if (removeBKFlag) {removeBKFlag = false; Game.forest_boss_key = false; Game.fire_boss_key = false; Game.water_boss_key = false; Game.spirit_boss_key = false; Game.shadow_boss_key = false;}
	
	Logic.gold_skulltulas = 0;
	var i;
	document.getElementById("skullsInLogicList").innerHTML = "";
	for (i = 1; i<=100; i++) {
		if (gs[i] == true) {Logic.gold_skulltulas +=1; document.getElementById("skullsInLogicList").innerHTML += gsText[i] + "<br />" ;} ;
	}
	document.getElementById("tokens_acquired").innerHTML = "Tokens: " + Game.tokens;
	if (!nerfed) {document.getElementById("skulls_in_logic").innerHTML = "In Logic: " + Logic.gold_skulltulas;} else {document.getElementById("skulls_in_logic").innerHTML = "In Logic: ??"}

	Game.logically_accessible = 0;
	Game.forest_logically_accessible=0;
	Game.fire_logically_accessible=0;
	Game.water_logically_accessible=0;
	Game.spirit_logically_accessible=0;
	Game.shadow_logically_accessible=0;
	Game.gtg_logically_accessible=0;
	Game.well_logically_accessible=0;
	Game.ganons_logically_accessible=0;
	
	Game.forest_checks_remaining = 0;
	Game.fire_checks_remaining = 0;
	Game.water_checks_remaining = 0;
	Game.spirit_checks_remaining = 0;
	Game.shadow_checks_remaining = 0;
	Game.gtg_checks_remaining = 0;
	Game.well_checks_remaining = 0;
	Game.ganons_checks_remaining = 0;

	temp = 0;
	var colorChange = false;
	Game.checks_remaining = 0;
	for (var i = 0; i < Locations.length; i++) {
		if (i < AreaIndexes[34]) {
			document.getElementById(Locations[i]).style.display = "none";
			document.getElementById("text_" + Locations[i]).style.display = "none";
			document.getElementById("br_" + Locations[i]).style.display = "none";
		}
		
		if (document.getElementById("skullSanity").value != "ALL" && document.getElementById("skullSanity").value != "DUNGEON" && (Locations[i].startsWith("gs_deku") || Locations[i].startsWith("gs_dodongos") || Locations[i].startsWith("gs_jabu") || Locations[i].startsWith("gs_forest") || Locations[i].startsWith("gs_fire") || Locations[i].startsWith("gs_water") || Locations[i].startsWith("gs_spirit") || Locations[i].startsWith("gs_shadow") || Locations[i].startsWith("gs_ice") || Locations[i].startsWith("gs_well"))) {continue;}
		if (document.getElementById("skullSanity").value != "ALL" && Locations[i].startsWith("gs_") && (!Locations[i].startsWith("gs_deku") && !Locations[i].startsWith("gs_dodongos") && !Locations[i].startsWith("gs_jabu") && !Locations[i].startsWith("gs_forest") && !Locations[i].startsWith("gs_fire") && !Locations[i].startsWith("gs_water") && !Locations[i].startsWith("gs_spirit") && !Locations[i].startsWith("gs_shadow") && !Locations[i].startsWith("gs_ice") && !Locations[i].startsWith("gs_well"))) {continue;}
		if (document.getElementById("scrubSanity").value != "ON" && Locations[i].startsWith("scrub_")) {continue;}
		if (document.getElementById("shopSanity").value != "4" && Locations[i].startsWith("shop_")) {continue;}
		if (document.getElementById("ganonBKSetting").value == "LACS" && Locations[i].startsWith("lacs")) {continue;}
		if (document.getElementById("shuffleOcarinas").value == "OFF" && (Locations[i].startsWith("hyrule_ocarina") || Locations[i].startsWith("lost_woods_fairy_ocarina"))) {continue;}
		
		var key = Locations[i];
		
		str = "text_" + key;
		str2 = "br_" + key;
		if (Check[key] == "unknown" || forcedDisplay[i] || (coopmode && (Check[key] == "small_key" || Check[key] == "boss_key"))) {
			document.getElementById(str).style.display = "inline-block";
			document.getElementById(key).style.display = "inline-block";
			document.getElementById(str2).style.display = "inline-block";
			if (i < AreaIndexes[34]) {
				if (Locations[i].includes("forest_")) {Game.forest_checks_remaining += 1;}
				else if (Locations[i].includes("fire_")) {Game.fire_checks_remaining += 1;}
				else if (Locations[i].includes("water_")) {Game.water_checks_remaining += 1;}
				else if (Locations[i].includes("spirit_")) {Game.spirit_checks_remaining += 1;}
				else if (Locations[i].includes("shadow_")) {Game.shadow_checks_remaining += 1;}
				else if (Locations[i].includes("gtg_")) {Game.gtg_checks_remaining += 1;}
				else if (Locations[i].includes("well_")) {Game.well_checks_remaining += 1;}
				else if (Locations[i].includes("ganons_")) {Game.ganons_checks_remaining += 1;}
				else {Game.checks_remaining += 1;}
			}
		}
		
		if (document.getElementById(str).style.display != "none") {if (document.getElementById(str).style.color == "orange" || document.getElementById(str).style.color == "magenta") {colorChange = true;} else {colorChange = false;}} else {colorChange = false;}
		if(document.getElementById(str).style.display == "none") {continue;}
		document.getElementById(str).innerHTML = backUp[i];
		if (i > lastItem && Check[key] != "unknown") {document.getElementById(str).innerHTML += ": " + capitalizeFirstLetter(Check[key])}
		
		if(i > lastItem && Check[key] != "unknown" && !Game[Check[key]] && (Location_Logic[key] || Location_Access[key] || Location_Could_Access[key]))
			document.getElementById(str).style.backgroundColor = "gray";
		else
			document.getElementById(str).style.backgroundColor = "";
		
		if(Location_Logic[key] == true) {
			if (nerfed && Location_Access[key] == true && !Location_Obtain[key] == true) {
				document.getElementById(str).className= "access_check_text";
				document.getElementById(str).style.opacity = .5;
				document.getElementById(str).style.fontWeight = "normal";
				document.getElementById(str).style.color ="yellow";
			}
			else if (Location_Access[key] == true) {
				document.getElementById(str).className= "logic_check_text"; 
				document.getElementById(str).style.fontWeight = "bold";
				document.getElementById(str).style.opacity = 1;
			}
			else {
				document.getElementById(str).className= "known_check_text";
				document.getElementById(str).style.fontWeight = "normal";
				//document.getElementById(str).style.fontStyle = "italic";
				document.getElementById(str).style.opacity = .5;
			}
			var checkInWothArea = -1;
			if(colorWothAreas) {
				for (var j = 1; j < 35; j++) {
					if(Check[Locations[i]] == "unknown" && ((i >= AreaIndexes[j-1] && i < AreaIndexes[j]) || i == SongIndexes[j-1] || i == SongIndexes2[j-1])) {
						for (var k = 1; k < 6; k++) {
							if(wothAreas[k] == AreaNames[j]) {
								checkInWothArea = k;
								break;
							}
						}
					}
				}
			}
			
			if ((!woth1Locations.includes(key) && !woth2Locations.includes(key) && !woth3Locations.includes(key) && !woth4Locations.includes(key) && !woth5Locations.includes(key)) || !circus) {
				if(i > lastItem && Check[key] != "unknown" && ManualOutOfLogicItems[Check[key]]) {
					document.getElementById(str).style.color = "#FFA500";
				}
				else {
					document.getElementById(str).style.color = "chartreuse";
				}
					
				if(nerfed && colorWothAreas && checkInWothArea != -1 && !alwaysHints.includes(Locations[i]))
					document.getElementById(str).style.border = "1px solid "+document.getElementById(str).style.color;
				else
					document.getElementById(str).style.border = "";
			}
			else {
				var woths = [woth1Locations.includes(key), woth2Locations.includes(key), woth3Locations.includes(key), woth4Locations.includes(key), woth5Locations.includes(key)];
				var j;
				var k;
				var l;
				var text = document.getElementById(str).innerHTML;
				document.getElementById(str).innerHTML = "";
				for (j = 0; j < text.length; j++) {
					for (k = 0; k < woths.length; k++) {
						if (woths[k]) {
						    let temptext = '<span style = "color: ' + WotHColors[k+1] + '">' + text[j] + '</span>';
							for (l = k+1; l <woths.length; l++) {
								if (woths[l]) {woths[k] = false;}
							}
							document.getElementById(str).innerHTML += temptext;
							break;
						}	
						//if (k == woths.length -1) {document.getElementById(str).innerHTML += text[j];}
					}
				}
			}
			if(document.getElementById(key).style.display != "none") {
				if (i <= lastItem) {Game.logically_accessible += 1;}
				if (i == AreaIndexes[12] - 1 && Game.deku_checks_remaining == 0) {Game.logically_accessible -= 1;}
			    if (i == AreaIndexes[16] - 1 && Game.dodongos_checks_remaining == 0) {Game.logically_accessible -= 1;}
				if (i == AreaIndexes[26] - 1 && Game.jabu_checks_remaining == 0) {Game.logically_accessible -= 1;}
				if (i >= AreaIndexes[26] && i < AreaIndexes[27]) {Game.forest_logically_accessible += 1;}
				if (i >= AreaIndexes[27] && i < AreaIndexes[26]) {Game.fire_logically_accessible += 1;}
				if (i >= AreaIndexes[28] && i < AreaIndexes[27]) {Game.water_logically_accessible += 1;}
				if (i >= AreaIndexes[29] && i < AreaIndexes[28]) {Game.spirit_logically_accessible += 1;}
				if (i >= AreaIndexes[30] && i < AreaIndexes[29]) {Game.shadow_logically_accessible += 1;}
				if (i >= AreaIndexes[31] && i < AreaIndexes[30]) {Game.ganons_logically_accessible += 1;}
				if (i >= AreaIndexes[32] && i < AreaIndexes[31]) {Game.gtg_logically_accessible += 1;}
				if (i >= AreaIndexes[33] && i < AreaIndexes[32]) {Game.well_logically_accessible += 1;}
			}
		}
		else if (Location_Access[key] == true) {
			if (!nerfed){
				document.getElementById(str).className= "access_check_text";
				document.getElementById(str).style.opacity = .5;
				document.getElementById(str).style.fontWeight = "normal";
				document.getElementById(str).style.color ="yellow";
			}
			else {
				if (Location_Access[key] == true && !Location_Obtain[key] == true) {
					document.getElementById(str).className= "access_check_text";
					document.getElementById(str).style.opacity = .5;
					document.getElementById(str).style.fontWeight = "normal";
					document.getElementById(str).style.color ="yellow";
				}
				else {
					var checkInWothArea = -1;
					if(colorWothAreas) {
						for (var j = 1; j < 35; j++) {
							if(Check[Locations[i]] == "unknown" && ((i >= AreaIndexes[j-1] && i < AreaIndexes[j]) || i == SongIndexes[j-1] || i == SongIndexes2[j-1])) {
								for (var k = 1; k < 6; k++) {
									if(wothAreas[k] == AreaNames[j]) {
										checkInWothArea = k;
										break;
									}
								}
							}
						}
					}
					if (hamsda) {
						document.getElementById(str).className= "access_check_text";
						document.getElementById(str).style.opacity = .5;
						document.getElementById(str).style.fontWeight = "normal";
					}
					else {
						document.getElementById(str).className= "logic_check_text";
						document.getElementById(str).style.opacity = 1;
						document.getElementById(str).style.fontWeight = "bold";
					}
					
					if(i > lastItem && Check[key] != "unknown" && ManualOutOfLogicItems[Check[key]]) {
						document.getElementById(str).style.color = "#FFA500";
					}
					else if (hamsda) {
						document.getElementById(str).style.color ="yellow";
					}
					else {
						document.getElementById(str).style.color ="chartreuse";
					}
					
					if(nerfed && colorWothAreas && checkInWothArea != -1 && !alwaysHints.includes(Locations[i]))
						document.getElementById(str).style.border = "1px solid "+document.getElementById(str).style.color;
					else
						document.getElementById(str).style.border = "";
				}
			}
		}
		else if (Location_Could_Access[key] == true || Location_Could_Peek[key] == true) {
			if (!nerfed){
				document.getElementById(str).className= "access_check_text";
				document.getElementById(str).style.opacity = .2;
				document.getElementById(str).style.fontWeight = "normal";
				document.getElementById(str).style.color ="yellow";
			}
			else {
				if(!Location_Could_Access[key] == true && Location_Could_Peek[key] == true) {
					document.getElementById(str).className= "access_check_text";
					document.getElementById(str).style.opacity = .2;
					document.getElementById(str).style.fontWeight = "normal";
					document.getElementById(str).style.color ="yellow";
				}
				else {
					var checkInWothArea = -1;
					if(colorWothAreas) {
						for (var j = 1; j < 35; j++) {
							if(Check[Locations[i]] == "unknown" && ((i >= AreaIndexes[j-1] && i < AreaIndexes[j]) || i == SongIndexes[j-1] || i == SongIndexes2[j-1])) {
								for (var k = 1; k < 6; k++) {
									if(wothAreas[k] == AreaNames[j]) {
										checkInWothArea = k;
										break;
									}
								}
							}
						}
					}
					document.getElementById(str).className= "access_check_text";
					document.getElementById(str).style.fontWeight = "normal";
					document.getElementById(str).style.opacity = .2;
					
					if(i > lastItem && Check[key] != "unknown" && ManualOutOfLogicItems[Check[key]]) {
						document.getElementById(str).style.color = "#FFA500";
					}
					else {
						document.getElementById(str).style.color = "yellow";
					}
					
					if(nerfed && colorWothAreas && checkInWothArea != -1 && !alwaysHints.includes(Locations[i]))
						document.getElementById(str).style.border = "1px solid "+document.getElementById(str).style.color;
					else
						document.getElementById(str).style.border = "";
				}
			}
		}
		else {
			if (hideInaccessible) {
				if (document.getElementById(str).style.display != "none") {document.getElementById(str).style.display = "none";}
				if (document.getElementById(key).style.display != "none") {document.getElementById(key).style.display = "none";}
				if (document.getElementById(str2).style.display != "none") {document.getElementById(str2).style.display = "none";}
			}
			document.getElementById(str).className= "ool_check_text";
			document.getElementById(str).style.opacity = .5;
			document.getElementById(str).style.fontWeight = "normal";
			document.getElementById(str).style.color ="black";
			
			var checkInWothArea = -1;
			if(colorWothAreas) {
				for (var j = 1; j < 35; j++) {
					if(Check[Locations[i]] == "unknown" && ((i >= AreaIndexes[j-1] && i < AreaIndexes[j]) || i == SongIndexes[j-1] || i == SongIndexes2[j-1])) {
						for (var k = 1; k < 6; k++) {
							if(wothAreas[k] == AreaNames[j]) {
								checkInWothArea = k;
								break;
							}
						}
					}
				}
			}
			
			if(nerfed && colorWothAreas && checkInWothArea != -1 && !alwaysHints.includes(Locations[i]))
				document.getElementById(str).style.border = "1px solid "+document.getElementById(str).style.color;
			else
				document.getElementById(str).style.border = "";
		}
		if (colorChange) {document.getElementById(str).style.color = "magenta";document.getElementById(str).style.opacity = "1";}
	}
	if (document.getElementById("pieceDungeons").value.includes("de")) {document.getElementById("text_deku_lobby").style.color = "#FFD700"; document.getElementById("text_deku_lobby").style.opacity = 1; document.getElementById("text_deku_lobby").style.fontWeight = "bold";}
	if (document.getElementById("pieceDungeons").value.includes("do")) {document.getElementById("text_dodongos_end_of_bridge").style.color = "#FFD700"; document.getElementById("text_dodongos_end_of_bridge").style.opacity = 1; document.getElementById("text_dodongos_end_of_bridge").style.fontWeight = "bold";}
	if (document.getElementById("pieceDungeons").value.includes("ja")) {document.getElementById("text_jabu_map").style.color = "#FFD700"; document.getElementById("text_jabu_map").style.opacity = 1; document.getElementById("text_jabu_map").style.fontWeight = "bold";}
	if (document.getElementById("pieceDungeons").value.includes("fo")) {document.getElementById("text_forest_blockRoom").style.color = "#FFD700"; document.getElementById("text_forest_blockRoom").style.opacity = 1; document.getElementById("text_forest_blockRoom").style.fontWeight = "bold";}
	if (document.getElementById("pieceDungeons").value.includes("fi")) {document.getElementById("text_fire_volvagia").style.color = "#FFD700"; document.getElementById("text_fire_volvagia").style.opacity = 1; document.getElementById("text_fire_volvagia").style.fontWeight = "bold";}
	if (document.getElementById("pieceDungeons").value.includes("wa")) {document.getElementById("text_water_morpha").style.color = "#FFD700"; document.getElementById("text_water_morpha").style.opacity = 1; document.getElementById("text_water_morpha").style.fontWeight = "bold";}
	if (document.getElementById("pieceDungeons").value.includes("sh")) {document.getElementById("text_shadow_compass").style.color = "#FFD700"; document.getElementById("text_shadow_compass").style.opacity = 1; document.getElementById("text_shadow_compass").style.fontWeight = "bold";}
	if (document.getElementById("pieceDungeons").value.includes("sp")) {document.getElementById("text_spirit_nearFourArmos").style.color = "#FFD700"; document.getElementById("text_spirit_nearFourArmos").style.opacity = 1; document.getElementById("text_spirit_nearFourArmos").style.fontWeight = "bold";}
	
	Game.forest_checks_remaining -= 5 - Game.current_forest_keys;
	Game.fire_checks_remaining -= 8 - Game.current_fire_keys
	Game.water_checks_remaining -= 6 - Game.current_water_keys
	Game.spirit_checks_remaining -= 5 - Game.current_spirit_keys
	Game.shadow_checks_remaining -= 5 - Game.current_shadow_keys
	Game.gtg_checks_remaining -= 9 - Game.current_gtg_keys
	Game.well_checks_remaining -= 3 - Game.current_well_keys
	Game.ganons_checks_remaining -= 2 - Game.current_ganons_keys;
	
	if (!Game.forest_boss_key) {Game.forest_checks_remaining -= 1;}
	if (!Game.fire_boss_key) {Game.fire_checks_remaining -= 1;}
	if (!Game.water_boss_key) {Game.water_checks_remaining -= 1;}
	if (!Game.spirit_boss_key) {Game.spirit_checks_remaining -= 1;}
	if (!Game.shadow_boss_key) {Game.shadow_checks_remaining -= 1;}
	
	Game.checks_remaining += Game.forest_checks_remaining + Game.fire_checks_remaining + Game.water_checks_remaining + Game.spirit_checks_remaining + Game.shadow_checks_remaining + Game.gtg_checks_remaining + Game.well_checks_remaining + Game.ganons_checks_remaining;
	
	Game.logically_accessible = Number(Game.logically_accessible);
	Game.logically_accessible=Game.logically_accessible.toFixed(0);
	document.getElementById("checks_remaining").innerHTML="Remaining: "+Game.checks_remaining;
	if (!nerfed) {document.getElementById("logically_accessible").innerHTML="&nbsp; &nbsp; In Logic: "+Game.logically_accessible;} else {document.getElementById("logically_accessible").innerHTML="&nbsp; &nbsp; In Logic: ??"}
}
function mouse_input() {
	if (event.button == 2 && Check[event.target.id] == "unknown") {
		mouseInputs_locations.push(event.target.id);
		str = event.target.id;
		str2 = "text_" + str;
		str3 = "br_" + str;
		Check[str] = "junk";
		document.getElementById(str).style.display = "none";
		document.getElementById(str2).style.display = "none";
		document.getElementById(str3).style.display = "none";
		Update();
	}
	if (event.button == 1 && event.target.id.includes("dodongos_")) {route_dodongos();}
	if (event.button == 1 && event.target.id.includes("deku_")) {route_deku();}
	if (event.button == 1 && event.target.id.includes("jabu_")) {route_jabu();}
	if (event.button == 1 && event.target.id.includes("ice_")) {route_ice();}
}
function mouse_input2() {
	if (event.button == 1) {
		for (var i = 1; i < 15; i++) {
			console.log(document.getElementById("gomode_" + i).style.display)
			if (document.getElementById("gomode_" + i).style.display == "none" || document.getElementById("gomode_" + i).style.display == "") {
				document.getElementById("gomode_" + i).src = event.target.src;
				document.getElementById("gomode_" + i).style.display = "inline-block";
				searchItems.unshift(ItemNames2[Items2.indexOf(event.target.id.replace("mouseInputs_",""))]); 
				break;
				
			}
		}
	}
	
	var item = "";
	if (mouseInputs_locations.length == 0) {return;}
	if (event.target.id == "mouseInputs_magicspell") {if (event.button == 2) {item = "farores_wind";} else {item = "dins_fire";}}
	else if (event.target.id == "mouseInputs_boots") {if (event.button == 2) {item = "hover_boots";} else {item = "iron_boots";}}
	else if (event.target.id == "mouseInputs_magicarrows") {console.log(event.target.value);if (event.button == 2) {item = "light_arrows";} else {item = "fire_arrows";}}
	else if (event.target.id == "mouseInputs_goronzora") {if (event.button == 2) {item = "zora_tunic";} else {item = "goron_tunic";}}
	else if (event.target.id == "mouseInputs_bottle") {if (event.button == 2) {item = "rutos_letter";} else {item = "bottle";}}
	else {item = event.target.id.replace("mouseInputs_","");}
	Check[mouseInputs_locations[0]] = "unknown";
	document.getElementById(mouseInputs_locations[0]).value = inputs[Items2.indexOf(item)];
	mouseInputs_locations.shift();
	Update();
}

function searchingFor_tracking() {
	item = event.target.id.replace("searchingFor_","");
	searchItems.splice(searchItems.indexOf(ItemNames[Items.indexOf(item)]),1) //Pepega
	console.log(searchItems)
	event.target.style.display = "none";
}

function update_summary_text() { 
	// Update Check Summary ClassNames (only items, not songs)
		
	for(var i = 0; i <= 37; i++){
		str = checkSummary[i] + "_location";
		
		if(Hinted[Location[checkSummary[i]]] && document.getElementById(str).innerHTML.indexOf("*") < 0)
			document.getElementById(str).innerHTML = "* " + document.getElementById(str).innerHTML + " *";
		else if(!Hinted[Location[checkSummary[i]]])
			document.getElementById(str).innerHTML = document.getElementById(str).innerHTML.replace("* ", "").replace(" *", "");
		
		var theItem = checkSummary[i];
		if (checkSummary[i] == "trade" && (Logic.prescription || Logic.claim_check)) {
			var exception = true;
			if(Known.prescription)
				theItem = "prescription";
			else if(Known.claim_check)
				theItem = "claim_check";
		} 
		else {
			var exception = false;
		}
		
		if(!nerfed) {
			if (Logic[theItem] || exception) {
				if (Game[theItem])
					document.getElementById(str).className = "checked_text_summary";
				else
					document.getElementById(str).className = "checked_text_summary_not_have";
			}
			else {
				if (Game[theItem])
					document.getElementById(str).className = "checked_text_summary_have_ool";
				else {
					if(CouldHave[theItem])
						document.getElementById(str).className = "checked_text_summary_ool_could_have";
					else
						document.getElementById(str).className = "checked_text_summary_ool";
				}
			}
		}
		else {
			if (Game[theItem] || (theItem == "trade" && (Known.prescription || Known.claim_check))) 
				if(ManualOutOfLogicItems[theItem])
					document.getElementById(str).className = "checked_text_summary_have_ool";
				else if(ManualInLogicItems[theItem])
					document.getElementById(str).className = "checked_text_summary";
				else
					document.getElementById(str).className = "checked_text_summary_unknown";
			else if(CouldHave[theItem])
				if(ManualOutOfLogicItems[theItem])
					document.getElementById(str).className = "checked_text_summary_ool_could_have";
				else if(ManualInLogicItems[theItem])
					document.getElementById(str).className = "checked_text_summary_not_have";
				else
					document.getElementById(str).className = "checked_text_summary_unknown_not_have";
			else if(Known[theItem]) 
				document.getElementById(str).className = "checked_text_summary_known";
			else
				document.getElementById(str).className = "checked_text_summary_ool";
		}
	}

}
function update_probabilities() {
	var explosivesLeft = 0;
	var majorLeft = 0;
	var bigLeft = 5;
	if (!Known.bomb_bag1) {explosivesLeft += 1;}
	if (!Known.bomb_bag2) {explosivesLeft += 1;}
	if (!Known.bomb_bag3) {explosivesLeft += 1;}
	if (!Known.bombchus1) {explosivesLeft += 1;}
	if (!Known.bombchus2) {explosivesLeft += 1;}
	if (!Known.bombchus3) {explosivesLeft += 1;}
	if (!Known.bombchus4) {explosivesLeft += 1;}
	if (!Known.bombchus5) {explosivesLeft += 1;}
	
	for (var i = 0; i < Items2.length; i++) {
		if(Items2[i] == "bombchus" || Items2[i] == "junk" || Items2[i] == "small_key" || Items2[i] == "boss_key" || i >= Items2.indexOf("lullaby")) {continue;}
		if(Items2[i] == "bottle" && Items2[i-1] == "bottle") {continue;}
		else if (Items2[i] == "bow" || Items2[i] == "bomb_bag" || Items2[i] == "strength" || Items2[i] == "slingshot" || Items2[i] == "bottle") {j = 3;}
		else if (Items2[i] == "magic" || Items2[i] == "wallet" || Items2[i] == "hookshot") {j = 2;}
		else {j = ""}
		
		if (!Known[Items2[i] + j]) {bigLeft += 1;}
	}
	
	if (searchItems.includes("Boomerang") && !Known.boomerang)  {majorLeft += 1;}
	if (searchItems.includes("Letter") && !Known.rutos_letter)  {majorLeft += 1;}
	if (searchItems.includes("Hammer") && !Known.hammer)  {majorLeft += 1;}
	if (searchItems.includes("Mirror") && !Known.mirror_shield)  {majorLeft += 1;}
	if (searchItems.includes("Strength"))  {
		if (!Known.strength1) {majorLeft += 1;} 
		if (!Known.strength2) {majorLeft += 1;} 
		if (!Known.strength3) {majorLeft += 1;} 
	}
	if (searchItems.includes("Scale"))  {
		if (!Known.scale1) {majorLeft += 1;} 
		if (!Known.scale2) {majorLeft += 1;} 
	}
	if (searchItems.includes("Magic"))  {
		if (!Known.magic1) {majorLeft += 1;} 
		if (!Known.magic2) {majorLeft += 1;} 
	}
	if (searchItems.includes("Bow"))  {
		if (!Known.bow1) {majorLeft += 1;} 
		if (!Known.bow2) {majorLeft += 1;} 
		if (!Known.bow3) {majorLeft += 1;} 
	}
	if (searchItems.includes("Hookshot"))  {
		if (!Known.hookshot1) {majorLeft += 1;} 
		if (!Known.hookshot2) {majorLeft += 1;} 
	}
	if (searchItems.includes("Bomb Bag"))  {
		if (!Known.bomb_bag1) {majorLeft += 1;} 
		if (!Known.bomb_bag2) {majorLeft += 1;} 
		if (!Known.bomb_bag3) {majorLeft += 1;} 
	}
	if (searchItems.includes("Slingshot"))  {
		if (!Known.slingshot1) {majorLeft += 1;} 
		if (!Known.slingshot2) {majorLeft += 1;} 
		if (!Known.slingshot3) {majorLeft += 1;} 
	}
	
	if (searchItems.includes("Din's Fire") && !Known.dins_fire)  {majorLeft += 1;}
	if (searchItems.includes("Hover Boots") && !Known.hover_boots)  {majorLeft += 1;}
	if (searchItems.includes("Kokiri Sword") && !Known.kokiri_sword)  {majorLeft += 1;}
	if (searchItems.includes("Iron Boots") && !Known.iron_boots)  {majorLeft += 1;}
	if (searchItems.includes("Light Arrows") && !Known.light_arrows)  {majorLeft += 1;}
	if (searchItems.includes("Lens") && !Known.lens)  {majorLeft += 1;}
	if (searchItems.includes("Light Arrows") && !Known.light_arrows)  {majorLeft += 1;}
	
	nChecks = document.getElementById("probability_input").value;
	document.getElementById("bait_probability").innerHTML = "Bait ("+(bigLeft/(majorLeft+bigLeft)*100).toFixed(2)+"%)"
	document.getElementById("major_probability").innerHTML = "Searching For ("+((1-Math.pow(1-majorLeft/(Game.checks_remaining-nChecks/2+1),nChecks))*100).toFixed(2)+"%)"
	document.getElementById("explosives_probability").innerHTML = "Explosives ("+(explosivesLeft/Game.checks_remaining*100).toFixed(2)+"%)"
}
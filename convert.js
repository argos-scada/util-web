const input_field = document.getElementById("queryinput");
const output_field = document.getElementById("jsonoutput");

function convert() {
	input = input_field.value;
	lines = input.split("\n");
	map = {};
	for(line in lines) {
		content = lines[line];
		let regex = /^[0-9]*\tl[0-9]-[a-z]*[0-9]?$/;
		console.log(content);
		if(regex.test(content)) {
			[id, xid] = content.split("\t");
			if(id && xid) {
				map[xid] = id;
			}
		}
	}
	output = JSON.stringify(map, null, 4);
	output_field.value = output;
}

function paste() {
	navigator.permissions.query({ name: "clipboard-read" }).then((result) => {
		if (result.state === "granted" || result.state === "prompt") {
			navigator.clipboard.readText().then(content => {
				input_field.value = content; 
			});
		}
		console.log({result});
	});
}

function copy() {
	navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
		if (result.state === "granted" || result.state === "prompt") {
			let json = output_field.value;
			navigator.clipboard.writeText(json);
		}
		console.log({result});
	});
}

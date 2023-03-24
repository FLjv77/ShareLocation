import { Component, OnInit } from '@angular/core';
//import * as fs from 'fs'

@Component({
  selector: 'app-submit-location',
  templateUrl: './submit-location.component.html',
  styleUrls: ['./submit-location.component.css']
})
export class SubmitLocationComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  public writeFile(){
	// Requiring fs module in which
	// writeFile function is defined.

	// Data which will write in a file.
	let data = "Learning how to write in a file."
	const fs = require('fs')

	// Write data in 'Output.txt' .
	fs.writeFile('Output.txt', data, (err: any) => {

		// In case of a error throw err.
		if (err) throw err;
	})

  }
}

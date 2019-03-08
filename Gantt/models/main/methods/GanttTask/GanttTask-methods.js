
model.GanttTask.entityMethods.editT = function(ganttT) {
	var formatter = require("formatting"); 
	this.text= ganttT.text
	this.start_date=ganttT.start_date
	this.parent = ganttT.parent
	this.duration=ganttT.duration
	this.progress= ganttT.progress
	this.open= ganttT.open
	this.save()	
	return this.ID;
};

model.GanttTask.collectionMethods.ganttTasksSource = function() {
	var taskData = []; // {id:1, text:"Project #1",start_date:"01-04-2013", duration:11, progress: 0.6, open: true},
	var formatter = require("formatting"); // access to module
	this.forEach(function(ganttT){
		taskData.push(
			{id:ganttT.ID, text:ganttT.text, start_date:formatDate(ganttT.start_date, { format: "dd-mm-yy" }), parent : ganttT.parent, duration:ganttT.duration, progress: ganttT.progress, open: ganttT.open}
		);
	});
	return taskData;
};
model.GanttTask.collectionMethods.ganttTasksSource.scope = "public";
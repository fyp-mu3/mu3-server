# Requires to run training at least once before using
#
# Usage
# input a csv file that include the followings: (): optional 
# top100u comp.rel.maj worked.in.consult worked.in.it extrovert intuitive thinking judging (mbti)
# return a sorted csv by the estimated probabilty to be hired. 


#load the training data
load("logit.rda")
require("doBy")

#!/usr/bin/env Rscript
args <- commandArgs(trailingOnly=TRUE)

# test if there is at least one argument: if not, return an error
if (length(args)!=1) {
  stop("Expect one argument. (input a csv file).\n", call.=FALSE)
} 
#format output file Name
ofName <- unlist(strsplit(args[1], ".", fixed = TRUE))
ofName <- paste("../temp/", ofName[1], "-sorted.", ofName[2], sep="")


input            <- read.csv(args[1])
input$prediction <- predict(logit, input)
inputSorted      <- orderBy (~-prediction, data = input)

write.csv(inputSorted, file = ofName, na="")

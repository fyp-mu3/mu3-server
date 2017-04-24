# Usage
# input a csv file with the following format: (): optional 
# admit top100u comp.rel.maj worked.in.consult worked.in.it extrovert intuitive thinking judging (mbti)
# return logit trained model that will be used by applying.R 


#!/usr/bin/env Rscript
args <- commandArgs(trailingOnly=TRUE)

# test if there is at least one argument: if not, return an error
if (length(args)!= 1) {
  stop("Expect one argument. (input a csv file).\n", call.=FALSE)
} 

ofName = "logit.rda"

# Read and train
dataTrain <- read.csv(args[1])
logit     <- glm(admit ~ top100u + comp.rel.maj + worked.it.consult + worked.in.house + mbti.e + mbti.n + mbti.t + mbti.j, data = dataTrain, family = "binomial")
 
# Save trained data
save (logit, file = ofName)

# concat all treeroots files together

#paths
pt_src="src/"
pt_boilerplate="${pt_src}/boilerplate/"
pt_entities="${pt_src}entities/"
pt_tests="src-test/"
pt_temp="${pt_src}/.temp/"

#create temporary folder for all intermediate representations of the src
mkdir $pt_temp

    #intermediate build steps
    cat ${pt_entities}* > ${pt_temp}entities.tmp.js
    cat ${pt_src}game.js ${pt_src}entity.js ${pt_temp}entities.tmp.js ${pt_src}main.js > ${pt_temp}treeroots.unwrapped.tmp.js

    #cat files for test
    cat ${pt_temp}treeroots.unwrapped.tmp.js > ${pt_test}treeroots.test.js

    #cat files for production
    cat ${pt_boilerplate}header.js ${pt_temp}treeroots.unwrapped.tmp.js ${pt_boilerplate}footer.js > treeroots.js


#remove the intermediate entities file created
rm -r $pt_temp
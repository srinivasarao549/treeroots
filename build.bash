#paths
pt_src="src/"
pt_boilerplate="${pt_src}/boilerplate/"
pt_traits="${pt_src}traits/"
pt_entities="${pt_src}entities/"
pt_core="${pt_src}core/"
pt_temp=".temp/"

pt_test="src-test/"

#create temporary folder for all intermediate representations of the src
mkdir $pt_temp

    #intermediate build steps
    cat ${pt_traits}* > ${pt_temp}traits.js
    cat ${pt_entities}* > ${pt_temp}entities.js
    cat ${pt_core}game.js ${pt_core}entity.js ${pt_temp}traits.js ${pt_temp}entities.js ${pt_core}main.js > ${pt_temp}treeroots.unwrapped.tmp.js

    #cat files for test
    cp ${pt_temp}treeroots.unwrapped.tmp.js ${pt_test}treeroots.test.js

    #cat files for production
    cat ${pt_boilerplate}header.js ${pt_temp}treeroots.unwrapped.tmp.js ${pt_boilerplate}footer.js > treeroots.js

#remove the intermediate entities file created
rm -r $pt_temp
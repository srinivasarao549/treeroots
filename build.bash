#paths
pt_src="src/"
pt_boilerplate="${pt_src}/boilerplate/"
pt_mixins="${pt_src}mixins/"
pt_entities="${pt_src}entities/"
pt_core="${pt_src}core/"
pt_temp=".temp/"

pt_test="src-test/"

#create temporary folder for all intermediate representations of the src
mkdir $pt_temp

    #intermediate build steps
    cat ${pt_mixins}position.js ${pt_mixins}graphics.js ${pt_mixins}movement.js > ${pt_temp}mixins.js
    cat ${pt_entities}* > ${pt_temp}entities.js
    cat ${pt_core}header.js ${pt_core}mixin.js ${pt_core}game.js ${pt_core}footer.js > ${pt_temp}core.js
    
    cat ${pt_temp}core.js ${pt_temp}mixins.js ${pt_temp}entities.js ${pt_src}main.js > ${pt_temp}treeroots.unwrapped.tmp.js

    #cat files for test
    cp ${pt_temp}treeroots.unwrapped.tmp.js ${pt_test}treeroots.test.js

    #cat files for production
    cat ${pt_boilerplate}header.js ${pt_temp}treeroots.unwrapped.tmp.js ${pt_boilerplate}footer.js > treeroots.js

#remove the intermediate entities file created
rm -r $pt_temp
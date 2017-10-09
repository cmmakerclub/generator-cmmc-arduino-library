from SCons.Script import DefaultEnvironment
import glob, shutil, os

env = DefaultEnvironment()
# uncomment line below to see environment variables
print env.Dump()
# print ARGUMENTS

print "BEING COPY FILES..."

if not os.path.exists("lib-dev/<%= className %>"):
    os.makedirs("lib-dev/<%= className %>")
else:
    shutil.rmtree("lib-dev/<%= className %>")
    os.makedirs("lib-dev/<%= className %>")
    
for file in glob.iglob('src/*.*'):
    print 'Copied file %s' % (file)
    shutil.copy2(file, "lib-dev/<%= className %>/")
